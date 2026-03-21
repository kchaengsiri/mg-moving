FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Source code is mounted via docker-compose volume for hot-reload
EXPOSE 8000
