from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import os
import uuid
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login(credentials: LoginRequest):
    """MVP Global Auth Verification matching against local env configurations."""
    admin_user = os.getenv("ADMIN_USERNAME", "admin")
    admin_pass = os.getenv("ADMIN_PASSWORD", "magmove2026")
    
    if credentials.username == admin_user and credentials.password == admin_pass:
        # Generates a pseudo-validation local MVP token. 
        # In production phase, transition to PyJWT securely wrapped by standard OA2 mechanisms.
        token = f"mgm_admin_{uuid.uuid4().hex}"
        return {"access_token": token, "token_type": "bearer"}
    
    raise HTTPException(status_code=401, detail="Invalid global administration credentials")
