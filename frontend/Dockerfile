# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Enable corepack to use pnpm securely without npm global installs
RUN corepack enable pnpm

# Copy package management files first to leverage Docker layer caching
# The wildcard (*) ensures it won't fail if pnpm-lock.yaml isn't generated yet
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies
RUN pnpm install

# Start the Vite development server and expose it to the host network
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]
