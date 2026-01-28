# 🎨 Skin AI - Dermatology AI Assistant

Une application web moderne d'IA pour l'analyse dermatologique avec Next.js frontend et Django backend.

## 🚀 Quick Start

### 1. Clone and navigate:
```bash
git clone https://github.com/JdiraSiham/PROJET-HACKATHON.git
cd PROJET-HACKATHON/Skin_Ai
```

### 2. Setup environment:
```bash
cp .env.example .env
# Add your GEMINI_API_KEY in .env
```

### 3. Run with Docker:
```bash
docker-compose up --build
```

### 🌐 Access:
- **Application**: http://localhost:80
- **Frontend Direct**: http://localhost:3000
- **API**: http://localhost:8000/api/
- **Admin Django**: http://localhost:8000/admin/

## 🐳 Docker Architecture

### Services:
- **frontend**: Next.js 14 avec TypeScript et TailwindCSS
- **backend**: Django 6.0.1 avec API REST
- **nginx**: Reverse proxy pour le routing

### Docker Commands:
```bash
docker-compose up -d          # Run in background
docker-compose logs -f        # View logs
docker-compose down           # Stop services
docker-compose restart        # Restart services
docker-compose ps             # View status
```

## 💻 Local Development

### Frontend (Next.js):
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
# Access: http://localhost:3000
```

### Backend (Django):
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python manage.py runserver
# Access: http://localhost:8000
```

## 🛠️ Tech Stack

### Frontend:
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend:
- **Django 6.0.1** - Web framework
- **Django REST Framework** - API
- **Google Generative AI** - AI analysis
- **SQLite** - Database

### DevOps:
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy
- **GitHub** - Version control

## 🎨 Features

- ✅ **Multi-language Support** - English, French, Arabic
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **AI Skin Analysis** - Google Gemini integration
- ✅ **Modern UI/UX** - Luxury design with animations
- ✅ **Admin Panel** - Django admin interface
- ✅ **RESTful API** - Clean API endpoints

## 📁 Project Structure

```
PROJET-HACKATHON/
└── Skin_Ai/                 # Main application
    ├── frontend/            # Next.js application
    │   ├── app/            # App router
    │   ├── components/     # React components
    │   ├── src/            # Source files
    │   └── Dockerfile      # Frontend Docker config
    ├── backend/            # Django application
    │   ├── diagnosis/      # Main app
    │   ├── skin_ai/       # Project config
    │   ├── requirements.txt # Python dependencies
    │   └── Dockerfile      # Backend Docker config
    ├── nginx.conf          # Nginx configuration
    ├── docker-compose.yml  # Docker orchestration
    ├── .env.example       # Environment template
    └── README.md          # Detailed documentation
```

## 🔧 Environment Variables

Create `.env` file from `.env.example`:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

## 📝 API Endpoints

- `GET /api/` - API information
- `POST /api/diagnosis/analyze/` - Skin analysis
- `/admin/` - Django admin panel

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Next.js team for excellent framework
- Django community for robust backend
- TailwindCSS for beautiful styling

---

**📁 Note**: The main application is located in the `Skin_Ai/` directory. Please navigate there for detailed setup instructions.
