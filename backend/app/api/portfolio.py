from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import uuid
from app.core.json_db import JsonDB

router = APIRouter()
db = JsonDB("portfolio.json")


class PortfolioItemModel(BaseModel):
    title: str
    description: str
    image_url: str
    category: str


@router.get("/portfolio", response_model=list[dict])
async def get_portfolio():
    """Retrieves all portfolio items."""
    try:
        data = await db.read_all()
        return data
    except Exception as e:
        print(f"Portfolio DB error: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving portfolio items")


@router.post("/portfolio", response_model=dict)
async def create_portfolio_item(item: PortfolioItemModel):
    """Creates a new portfolio item."""
    try:
        new_item = {
            "id": f"pf_{str(uuid.uuid4())[:8]}",
            "title": item.title,
            "description": item.description,
            "image_url": item.image_url,
            "category": item.category,
        }
        await db.append(new_item)
        return new_item
    except Exception as e:
        print(f"Portfolio DB error: {e}")
        raise HTTPException(status_code=500, detail="Error creating portfolio item")


@router.put("/portfolio/{item_id}", response_model=dict)
async def update_portfolio_item(item_id: str, item: PortfolioItemModel):
    """Updates an existing portfolio item."""
    try:
        data = await db.read_all()
        for i, entry in enumerate(data):
            if entry.get("id") == item_id:
                data[i].update({
                    "title": item.title,
                    "description": item.description,
                    "image_url": item.image_url,
                    "category": item.category,
                })
                await db.rewrite_all(data)
                return data[i]
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    except HTTPException:
        raise
    except Exception as e:
        print(f"Portfolio DB error: {e}")
        raise HTTPException(status_code=500, detail="Error updating portfolio item")


@router.delete("/portfolio/{item_id}")
async def delete_portfolio_item(item_id: str):
    """Deletes a portfolio item."""
    try:
        data = await db.read_all()
        filtered = [d for d in data if d.get("id") != item_id]
        if len(filtered) == len(data):
            raise HTTPException(status_code=404, detail="Portfolio item not found")
        await db.rewrite_all(filtered)
        return {"message": "Portfolio item deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Portfolio DB error: {e}")
        raise HTTPException(status_code=500, detail="Error deleting portfolio item")
