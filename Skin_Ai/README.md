# 🎨 Skin AI - Dermatology AI Assistant

A modern AI-powered web application for dermatological analysis with a Next.js frontend and a Django backend.

## 🚀 Quick Start

### 1. Clone and navigate:
```bash
git clone https://github.com/JdiraSiham/PROJET-HACKATHON.git
cd PROJET-HACKATHON/Skin_Ai
```

### 2. ⚠️ **IMPORTANT – Configure Your Gemini API Key**

**REQUIRED :** You must configure your own Google Gemini API key for the application to work.

#### Step A – Get an API Key:
1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click on “Create API Key”
4. Copy the generated key (it looks like: `AIzaSy...`)

#### Step B – Configure the API Key in the project:
1. Open the file: `backend/skin_ai/settings.py`
2. Find the line (around line 134):
   ```python
   GEMINI_API_KEY ="AIzaSyDru1I4lqLey-vl1oDCwisymSn6CACSMHI"
   ```
3. **Replace the existing key with your new key** :
   ```python
   GEMINI_API_KEY ="VOTRE_NOUVELLE_CLE_API_ICI"
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
Skin_Ai/
├── frontend/                 # Next.js application
│   ├── app/                 # App router
│   ├── components/          # React components
│   ├── src/                 # Source files
│   └── Dockerfile           # Frontend Docker config
├── backend/                 # Django application
│   ├── diagnosis/           # Main app
│   ├── skin_ai/            # Project config
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # Backend Docker config
├── nginx.conf               # Nginx configuration
├── docker-compose.yml       # Docker orchestration
├── .env.example            # Environment template
└── README.md               # This file
```

## 🔧 Environment Variables

### ⚠️ **IMPORTANT – API Key Configuration**

For the application to work, you MUST configure your Google Gemini API key:

**1. Get your API Key:**
- Visit: https://aistudio.google.com/app/apikey
- Create a new API key
- Copy the key (format : `AIzaSy...`)

**2. Configure the API Key:**
- Open : `backend/skin_ai/settings.py`
- Find the line : `GEMINI_API_KEY ="AIzaSyDru1I4lqLey-vl1oDCwisymSn6CACSMHI"`
- **Replace it with your key:** : `GEMINI_API_KEY ="VOTRE_CLÉ_ICI"`

**3. Restart the services :**
```bash
docker-compose restart backend
```

### Optional environment variables:

Create `.env` file from `.env.example`:

```bash
# Django Settings
DEBUG=True
SECRET_KEY=your-secret-key-here
DJANGO_SETTINGS_MODULE=skin_ai.settings

# Database (if using PostgreSQL instead of SQLite)
# DATABASE_URL=postgresql://user:password@localhost:5432/skin_ai

# CORS Settings
ALLOWED_HOSTS=localhost,127.0.0.1,*
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 📝 API Endpoints

- `GET /api/` - API information
- `POST /api/diagnosis/analyze/` - Skin analysis
- `/admin/` - Django admin panel

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. **Configure your API Key** (see the "Configuration API Key" section)
4. Commit changes
5. Push to branch
6. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Next.js team for excellent framework
- Django community for robust backend
- TailwindCSS for beautiful styling

---

**✅ Last Updated: January 28, 2026 - Docker Configuration Complete**

## 🔧 **Troubleshooting – Common Issues**

### ❌ **403 Error “API key was reported as leaked"**
**Solution :** Your API key has been blacklisted.
1. Create a new API key at https://aistudio.google.com/app/apikey
2. Update `backend/skin_ai/settings.py`
3. Restart: `docker-compose restart backend`

### ❌ **The application does not start**
**Check that:**
- Docker Desktop is running
- Ports 80, 3000, and 8000 are not in use
- The API key is correctly configured

### ❌ **Skin analysis is not working**
**Check that:**
- The API key is valid and active
- Your internet connection is working
- Backend logs: `docker-compose logs backend`

### 🎯 **Support**
For any questions, check the logs:
```bash
docker-compose logs -f
```
