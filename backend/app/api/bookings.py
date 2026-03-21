from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import uuid
from datetime import datetime, timezone
from app.core.json_db import JsonDB

router = APIRouter()
db = JsonDB("bookings.json")

class BookingRequest(BaseModel):
    serviceType: str = Field(..., description="House Moving, Motorcycle, Local, Inter-provincial")
    pickupLocation: str
    dropoffLocation: str
    moveDate: str
    moveTime: str
    contactName: str
    contactPhone: str

class BookingResponse(BaseModel):
    id: str
    status: str
    message: str

@router.post("/bookings", response_model=BookingResponse)
async def create_booking(booking: BookingRequest):
    """Securely receives, validates, and records a customer booking request."""
    booking_id = str(uuid.uuid4())
    record = booking.model_dump()
    
    # Enrich with backend metadata
    record["id"] = booking_id
    record["status"] = "pending_quote"
    record["createdAt"] = datetime.now(timezone.utc).isoformat()
    
    try:
        await db.append(record)
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
