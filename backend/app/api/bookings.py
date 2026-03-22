from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone
import os
import json
import urllib.request
import urllib.parse
import asyncio
from app.core.json_db import JsonDB

router = APIRouter()
db = JsonDB("bookings.json")
notifications_db = JsonDB("notifications.json")

async def dispatch_notifications(booking_record: dict):
    try:
        data = await notifications_db.read_all()
        settings = data[0] if isinstance(data, list) and data else (data if isinstance(data, dict) else {})
        
        line_token = settings.get("line_notify_token")
        telegram_id = settings.get("telegram_chat_id")
        
        message = (
            f"🚨 MagMove New Booking!\n"
            f"👤 Name: {booking_record.get('contactName')}\n"
            f"📞 Phone: {booking_record.get('contactPhone')}\n"
            f"📦 Service: {booking_record.get('serviceType')}\n"
            f"🗺️ Distance: {booking_record.get('distance', 'N/A')} km\n"
            f"💰 Est. Price: {booking_record.get('price', 'N/A')} THB"
        )
        
        def send():
            if line_token:
                try:
                    line_data = urllib.parse.urlencode({"message": message}).encode("utf-8")
                    req = urllib.request.Request("https://notify-api.line.me/api/notify", data=line_data)
                    req.add_header("Authorization", f"Bearer {line_token}")
                    urllib.request.urlopen(req, timeout=5)
                except Exception as e:
                    print(f"Line Notify Error: {e}")
                    
            if telegram_id:
                bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
                if bot_token:
                    try:
                        tg_data = json.dumps({"chat_id": telegram_id, "text": message}).encode("utf-8")
                        req = urllib.request.Request(f"https://api.telegram.org/bot{bot_token}/sendMessage", data=tg_data)
                        req.add_header("Content-Type", "application/json")
                        urllib.request.urlopen(req, timeout=5)
                    except Exception as e:
                        print(f"Telegram Notify Error: {e}")
        
        await asyncio.to_thread(send)
    except Exception as e:
        print(f"Error dispatching notifications: {e}")

class BookingRequest(BaseModel):
    serviceType: str = Field(..., description="House Moving, Motorcycle, Local, Inter-provincial")
    pickupLocation: str
    dropoffLocation: str
    moveDate: str
    moveTime: str
    contactName: str
    contactPhone: str
    distance: Optional[float] = None
    price: Optional[float] = None

class BookingResponse(BaseModel):
    id: str
    status: str
    message: str

@router.post("/bookings", response_model=BookingResponse)
async def create_booking(booking: BookingRequest, background_tasks: BackgroundTasks):
    """Securely receives, validates, and records a customer booking request."""
    booking_id = str(uuid.uuid4())
    record = booking.model_dump()
    
    # Enrich with backend metadata
    record["id"] = booking_id
    record["status"] = "pending_quote"
    record["createdAt"] = datetime.now(timezone.utc).isoformat()
    
    try:
        await db.append(record)
        
        # Fire off non-blocking webhook dispatcher
        background_tasks.add_task(dispatch_notifications, record)
        
        return BookingResponse(
            id=booking_id,
            status="pending_quote",
            message="Booking successfully requested"
        )
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while processing booking.")

@router.get("/bookings", response_model=list[dict])
async def get_all_bookings():
    """Retrieves all bookings."""
    try:
        data = await db.read_all()
        # Sort descending by creation date safely
        data.sort(key=lambda x: x.get("createdAt", ""), reverse=True)
        return data
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error reading bookings")

class UpdateBookingStatusRequest(BaseModel):
    status: str

@router.patch("/bookings/{booking_id}")
async def update_booking_status(booking_id: str, request: UpdateBookingStatusRequest):
    """Updates the status of a specific booking using the asyncio DB lock."""
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
