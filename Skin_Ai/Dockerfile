# Multi-stage build for Skin AI application
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm ci --only=production

# Copy frontend source code
COPY frontend/ ./

# Build frontend
RUN npm run build

# Backend stage
FROM python:3.11-slim AS backend

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Copy frontend build to backend static files
COPY --from=frontend-builder /app/frontend/out ./static/

# Create media directory
RUN mkdir -p media

# Expose port
EXPOSE 8000

# Set environment variables
ENV DJANGO_SETTINGS_MODULE=skin_ai.settings
ENV PYTHONUNBUFFERED=1

# Run Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
