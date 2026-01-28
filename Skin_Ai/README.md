# 🎨 Skin AI - Dermatology AI Assistant

Une application web moderne d'IA pour l'analyse dermatologique avec Next.js frontend et Django backend.

## 🚀 Quick Start

### 1. Clone and navigate:
```bash
git clone https://github.com/JdiraSiham/PROJET-HACKATHON.git
cd PROJET-HACKATHON/Skin_Ai
```

### 2. ⚠️ **IMPORTANT - Configurez votre API Key Gemini**

**OBLIGATOIRE :** Vous devez configurer votre propre API key Google Gemini pour que l'application fonctionne.

#### Étape A - Obtenir une API Key :
1. Allez sur https://aistudio.google.com/app/apikey
2. Connectez-vous avec votre compte Google
3. Cliquez sur "Create API Key"
4. Copiez la clé générée (elle ressemble à : `AIzaSy...`)

#### Étape B - Configurer l'API Key dans le projet :
1. Ouvrez le fichier : `backend/skin_ai/settings.py`
2. Trouvez la ligne (vers la ligne 134) :
   ```python
   GEMINI_API_KEY ="AIzaSyDru1I4lqLey-vl1oDCwisymSn6CACSMHI"
   ```
3. **Remplacez la clé existante par votre nouvelle clé** :
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

### ⚠️ **IMPORTANT - Configuration API Key**

Pour que l'application fonctionne, vous **DEVEZ** configurer votre API key Google Gemini :

**1. Obtenez votre API Key :**
- Visitez : https://aistudio.google.com/app/apikey
- Créez une nouvelle API key
- Copiez la clé (format : `AIzaSy...`)

**2. Configurez l'API Key :**
- Ouvrez : `backend/skin_ai/settings.py`
- Trouvez la ligne : `GEMINI_API_KEY ="AIzaSyDru1I4lqLey-vl1oDCwisymSn6CACSMHI"`
- **Remplacez par votre clé** : `GEMINI_API_KEY ="VOTRE_CLÉ_ICI"`

**3. Redémarrez les services :**
```bash
docker-compose restart backend
```

### Variables d'environnement optionnelles :

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
3. **Configurez votre API Key** (voir section "Configuration API Key")
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

## 🔧 **Dépannage - Problèmes Communs**

### ❌ **Erreur 403 "API key was reported as leaked"**
**Solution :** Votre API key a été blacklistée.
1. Créez une nouvelle API key sur https://aistudio.google.com/app/apikey
2. Mettez à jour `backend/skin_ai/settings.py`
3. Redémarrez : `docker-compose restart backend`

### ❌ **L'application ne se lance pas**
**Vérifiez :**
- Docker Desktop est bien démarré
- Ports 80, 3000, 8000 ne sont pas utilisés
- API key est correctement configurée

### ❌ **L'analyse de peau ne fonctionne pas**
**Vérifiez :**
- API key est valide et active
- Connexion internet fonctionne
- Logs du backend : `docker-compose logs backend`

### 🎯 **Support**
Pour toute question, vérifiez les logs :
```bash
docker-compose logs -f
```
