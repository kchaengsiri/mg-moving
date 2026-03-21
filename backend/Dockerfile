# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Set Environment Variables to prevent Python from creating .pyc files and to display logs immediately
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install Dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Note that we don't copy the code all the way because we will use Volume Mount in docker-compose instead
# To allow hot-reload when editing code

# Run FastAPI with Uvicorn with --reload mode
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
