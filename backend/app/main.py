from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import bookings, settings, auth, portfolio

app = FastAPI(
    title="MagMove OS API",
    description="Backend engine governing CRM and Analytics for MagMove Phuket.",
    version="1.0.0"
)

# Protect and configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Expand this securely in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(bookings.router, prefix="/api", tags=["bookings"])
app.include_router(settings.router, prefix="/api/settings", tags=["settings"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(portfolio.router, prefix="/api", tags=["portfolio"])

@app.get("/health", tags=["system"])
def health_check():
    return {"status": "operational", "service": "MagMove Engine"}
