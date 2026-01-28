# Skin AI - Docker Deployment

## Quick Start

1. Clone and navigate:
```bash
git clone https://github.com/JdiraSiham/PROJET-HACKATHON.git
cd PROJET-HACKATHON/Skin_Ai
```

2. Setup environment:
```bash
cp .env.example .env
# Add your GEMINI_API_KEY in .env
```

3. Run with Docker:
```bash
docker-compose up --build
```

Access:
- App: http://localhost:80
- API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/

## Docker Commands
```bash
docker-compose up -d          # Run in background
docker-compose logs -f        # View logs
docker-compose down           # Stop services
docker-compose restart        # Restart services
```

## Local Development
Backend uses its own venv (backend/venv/) - not the global one.

Frontend: `cd frontend && npm install && npm run dev`
Backend: `cd backend && source venv/bin/activate && python manage.py runserver`
