from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.json_db import JsonDB
import uuid

router = APIRouter()
services_db = JsonDB("services.json")
notifications_db = JsonDB("notifications.json")

class NotificationSettingsModel(BaseModel):
    line_notify_token: str
    telegram_chat_id: str

class ServiceModel(BaseModel):
    name_en: str
    name_th: str
    base_price: float
    price_per_km: float

@router.get("/services")
async def get_services():
    """Retrieves all service types."""
    try:
        data = await services_db.read_all()
        return data
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving services")

@router.post("/services")
async def create_service(service: ServiceModel):
    """Creates a new service type."""
    try:
        new_service = {
            "id": f"svc_{str(uuid.uuid4())[:8]}",
            "name_en": service.name_en,
            "name_th": service.name_th,
            "base_price": service.base_price,
            "price_per_km": service.price_per_km
        }
        await services_db.append(new_service)
        return new_service
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error creating service")

@router.put("/services/{service_id}")
async def update_service(service_id: str, service: ServiceModel):
    """Updates an existing service type based on ID."""
    try:
        data = await services_db.read_all()
        for i, item in enumerate(data):
            if item.get("id") == service_id:
                data[i]["name_en"] = service.name_en
                data[i]["name_th"] = service.name_th
                data[i]["base_price"] = service.base_price
                data[i]["price_per_km"] = service.price_per_km
                await services_db.rewrite_all(data)
                return data[i]
        raise HTTPException(status_code=404, detail="Service not found")
    except HTTPException:
        raise
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error updating service")

@router.delete("/services/{service_id}")
async def delete_service(service_id: str):
    """Deletes an existing service type."""
    try:
        data = await services_db.read_all()
        filtered_data = [d for d in data if d.get("id") != service_id]
        if len(data) == len(filtered_data):
            raise HTTPException(status_code=404, detail="Service not found")
            
        await services_db.rewrite_all(filtered_data)
        return {"message": "Service deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error deleting service")

@router.get("/notifications")
async def get_notifications():
    """Retrieves notification settings."""
    try:
        data = await notifications_db.read_all()
        # If the file is empty or missing, read_all might return an empty list or dict.
        if isinstance(data, list):
            return data[0] if data else {"line_notify_token": "", "telegram_chat_id": ""}
        if not data:
            return {"line_notify_token": "", "telegram_chat_id": ""}
        return data
    except Exception as e:
        print(f"Database error: {e}")
        return {"line_notify_token": "", "telegram_chat_id": ""}

@router.post("/notifications")
async def update_notifications(settings: NotificationSettingsModel):
    """Updates notification settings."""
    try:
        new_settings = {
            "line_notify_token": settings.line_notify_token,
            "telegram_chat_id": settings.telegram_chat_id
        }
        await notifications_db.rewrite_all(new_settings)
        return new_settings
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error updating notification settings")
