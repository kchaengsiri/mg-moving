from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone
import os
import json
import urllib.request
import urllib.error
import asyncio
from app.core.json_db import JsonDB

router = APIRouter()
db = JsonDB("bookings.json")
notifications_db = JsonDB("notifications.json")

# ─── OSRM Distance Calculation ───────────────────────────────────────────────

async def calculate_distance_km(origin_lng: float, origin_lat: float, dest_lng: float, dest_lat: float) -> Optional[float]:
    """Call the public OSRM routing engine to get driving distance in km."""
    try:
        url = (
            f"http://router.project-osrm.org/route/v1/driving/"
            f"{origin_lng},{origin_lat};{dest_lng},{dest_lat}"
            f"?overview=false"
        )
        req = urllib.request.Request(url, headers={"User-Agent": "MagMove-Backend"})
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read())
        if data.get("routes"):
            return round(data["routes"][0]["distance"] / 1000, 2)
    except Exception as e:
        print(f"OSRM routing error: {e}")
    return None

# ─── Notification Dispatcher ─────────────────────────────────────────────────

async def dispatch_notifications(booking_record: dict):
    try:
        data = await notifications_db.read_all()
        settings = data[0] if isinstance(data, list) and data else (data if isinstance(data, dict) else {})

        line_channel_access_token = settings.get("line_channel_access_token")
        line_user_id = settings.get("line_user_id")
        telegram_id = settings.get("telegram_chat_id")

        distance_km = booking_record.get("distance_km")
        est_price = booking_record.get("est_price")
        distance_str = f"{distance_km:.1f} km" if distance_km is not None else "N/A"
        price_str = f"{int(est_price):,} THB" if est_price is not None else "N/A"

        origin_lat = booking_record.get("origin_lat", "N/A")
        origin_lng = booking_record.get("origin_lng", "N/A")
        dest_lat = booking_record.get("dest_lat", "N/A")
        dest_lng = booking_record.get("dest_lng", "N/A")
        origin_label = booking_record.get("origin_label", "—")
        dest_label = booking_record.get("dest_label", "—")

        message = (
            f"🚨 MagMove New Quote Request!\n"
            f"👤 Name: {booking_record.get('contactName')}\n"
            f"📞 Phone: {booking_record.get('contactPhone')}\n"
            f"📦 Service: {booking_record.get('serviceType')}\n"
            f"📍 Origin: {origin_label}\n"
            f"   ↳ Coords: {origin_lat}, {origin_lng}\n"
            f"🏁 Destination: {dest_label}\n"
            f"   ↳ Coords: {dest_lat}, {dest_lng}\n"
            f"🗺️ Distance: {distance_str}\n"
            f"💰 Est. Price: {price_str}"
        )

        def send():
            if line_channel_access_token and line_user_id:
                if not (len(line_user_id) == 33 and line_user_id[0] in ('U', 'C', 'R')):
                    print(f"LINE Dispatch Skipped: Invalid User ID '{line_user_id}'.")
                else:
                    try:
                        payload = {"to": line_user_id, "messages": [{"type": "text", "text": message}]}
                        line_data = json.dumps(payload).encode("utf-8")
                        req = urllib.request.Request(
                            "https://api.line.me/v2/bot/message/push",
                            data=line_data, method="POST"
                        )
                        req.add_header("Authorization", f"Bearer {line_channel_access_token}")
                        req.add_header("Content-Type", "application/json")
                        urllib.request.urlopen(req, timeout=5)
                    except urllib.error.HTTPError as e:
                        print(f"LINE HTTP {e.code}: {e.read().decode('utf-8')}")
                    except urllib.error.URLError as e:
                        print(f"LINE URL Error: {e.reason}")
                    except Exception as e:
                        print(f"LINE Unexpected Error: {e}")

            if telegram_id:
                bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
                if bot_token:
                    try:
                        tg_data = json.dumps({"chat_id": telegram_id, "text": message}).encode("utf-8")
                        req = urllib.request.Request(
                            f"https://api.telegram.org/bot{bot_token}/sendMessage",
                            data=tg_data
                        )
                        req.add_header("Content-Type", "application/json")
                        urllib.request.urlopen(req, timeout=5)
                    except Exception as e:
                        print(f"Telegram Notify Error: {e}")

        await asyncio.to_thread(send)
    except Exception as e:
        print(f"Error dispatching notifications: {e}")

# ─── Pydantic Models ──────────────────────────────────────────────────────────

class BookingRequest(BaseModel):
    serviceType: str = Field(..., description="Service tier name")
    origin_lat: float
    origin_lng: float
    dest_lat: float
    dest_lng: float
    origin_label: Optional[str] = None
    dest_label: Optional[str] = None
    moveDate: str
    moveTime: str
    contactName: str
    contactPhone: str

class BookingResponse(BaseModel):
    id: str
    status: str
    message: str

# ─── Routes ──────────────────────────────────────────────────────────────────

@router.post("/bookings", response_model=BookingResponse)
async def create_booking(booking: BookingRequest, background_tasks: BackgroundTasks):
    """Validates a booking, calculates distance via OSRM, and saves to JSON DB."""
    booking_id = str(uuid.uuid4())
    record = booking.model_dump()
    record["id"] = booking_id
    record["status"] = "pending_quote"
    record["createdAt"] = datetime.now(timezone.utc).isoformat()

    # Backend OSRM distance calculation
    distance_km = await calculate_distance_km(
        booking.origin_lng, booking.origin_lat,
        booking.dest_lng, booking.dest_lat
    )
    BASE_PRICE = 1500
    RATE_PER_KM = 50
    est_price = round(BASE_PRICE + (distance_km * RATE_PER_KM)) if distance_km is not None else None

    record["distance_km"] = distance_km
    record["est_price"] = est_price

    try:
        await db.append(record)
        background_tasks.add_task(dispatch_notifications, record)
        return BookingResponse(id=booking_id, status="pending_quote", message="Quote request received")
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while processing booking.")

@router.get("/bookings", response_model=list[dict])
async def get_all_bookings():
    """Retrieves all bookings sorted by most recent."""
    try:
        data = await db.read_all()
        data.sort(key=lambda x: x.get("createdAt", ""), reverse=True)
        return data
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error reading bookings")

class UpdateBookingStatusRequest(BaseModel):
    status: str

@router.patch("/bookings/{booking_id}")
async def update_booking_status(booking_id: str, request: UpdateBookingStatusRequest):
    """Updates the status of a specific booking."""
    try:
        data = await db.read_all()
        for i, b in enumerate(data):
            if b.get("id") == booking_id:
                data[i]["status"] = request.status
                data[i]["updatedAt"] = datetime.now(timezone.utc).isoformat()
                await db.rewrite_all(data)
                return {"message": "Status updated successfully", "booking": data[i]}
        raise HTTPException(status_code=404, detail="Booking not found")
    except HTTPException:
        raise
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error updating booking")
