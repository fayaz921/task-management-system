# Stage 1: Build React SPA
FROM node:22-alpine AS build
WORKDIR /app

# Copy dependency definitions for layer caching
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build args and environment variables for Vite build-time replacement
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build production assets to /app/dist
RUN npm run build

# Stage 2: Serve SPA with Nginx
FROM nginx:alpine AS final

# Copy built static files to Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with SPA routing fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
