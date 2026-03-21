FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
# Source code is mounted via docker-compose volume for hot-reload
EXPOSE 3000
