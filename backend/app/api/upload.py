from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import os
import uuid
import shutil

router = APIRouter()

# Read upload directory from environment — defaults to /app/app/upload for Docker
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "/app/app/upload")
PORTFOLIO_UPLOAD_DIR = os.path.join(UPLOAD_DIR, "portfolio")


@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    """Accepts an image file and saves it to the configured upload directory."""
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are accepted.")

    os.makedirs(PORTFOLIO_UPLOAD_DIR, exist_ok=True)

    ext = os.path.splitext(file.filename or "upload")[1] or ".jpg"
    filename = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(PORTFOLIO_UPLOAD_DIR, filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        print(f"Upload error: {e}")
        raise HTTPException(status_code=500, detail="Failed to save uploaded file.")
    finally:
        await file.close()

    return {"image_url": f"/api/uploads/portfolio/{filename}"}


@router.get("/uploads/portfolio/{filename}")
async def serve_portfolio_image(filename: str):
    """Serves an uploaded portfolio image file."""
    # Sanitize: reject any path traversal attempts
    if ".." in filename or "/" in filename:
        raise HTTPException(status_code=400, detail="Invalid filename.")

    file_path = os.path.join(PORTFOLIO_UPLOAD_DIR, filename)
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="Image not found.")

    return FileResponse(file_path)
