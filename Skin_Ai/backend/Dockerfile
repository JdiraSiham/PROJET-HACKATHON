# Backend Dockerfile - Django Application
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Create media directory
RUN mkdir -p media

# Expose port
EXPOSE 8000

# Set environment variables
ENV DJANGO_SETTINGS_MODULE=skin_ai.settings
ENV PYTHONUNBUFFERED=1

# Run Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
