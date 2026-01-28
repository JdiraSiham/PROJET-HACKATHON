# Guide de connexion Backend-Frontend

Ce guide explique comment le backend Django et le frontend Next.js sont connectés.

## Configuration

### Backend (Django)

Le backend est configuré pour accepter les requêtes du frontend via CORS :

- **Port**: 8000 (par défaut)
- **CORS**: Configuré pour accepter les requêtes depuis `http://localhost:3000` et `http://localhost:5173`
- **Endpoint principal**: `/api/diagnosis/analyze/` (POST)

#### Pour démarrer le backend :

```bash
cd backend
python manage.py runserver
```

Le serveur sera accessible sur `http://localhost:8000`

### Frontend (Next.js)

Le frontend est configuré pour communiquer avec le backend via le service API.

- **Port**: 3000 (par défaut)
- **Configuration API**: Définie dans `frontend/lib/api-config.ts`
- **Service API**: `frontend/lib/api-service.ts`

#### Pour démarrer le frontend :

```bash
cd frontend
pnpm install  # ou npm install
pnpm dev          # ou npm run dev
```

Le serveur sera accessible sur `http://localhost:3000`

## Configuration de l'URL de l'API

Par défaut, le frontend utilise `http://localhost:8000` comme URL de base de l'API.

Pour changer cette URL, créez un fichier `.env.local` dans le dossier `frontend` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Utilisation

### Service API

Le service API est disponible via `apiService` :

```typescript
import { apiService } from '@/lib/api-service'

// Analyser une vidéo
const result = await apiService.analyzeSkinVideo(videoFile)
```

### Composant d'exemple

Un composant d'exemple est disponible dans `frontend/components/skin-analysis.tsx` qui montre comment utiliser le service API pour analyser une vidéo.

Pour l'utiliser dans votre application :

```tsx
import { SkinAnalysis } from '@/components/skin-analysis'

export default function Page() {
  return <SkinAnalysis />
}
```

## Structure des fichiers

```
backend/
  ├── skin_ai/
  │   └── settings.py          # Configuration CORS et Django
  ├── diagnosis/
  │   ├── views.py             # Vue API pour l'analyse
  │   └── urls.py              # Routes API
  └── manage.py

frontend/
  ├── lib/
  │   ├── api-config.ts        # Configuration de l'API
  │   └── api-service.ts       # Service pour appeler le backend
  ├── components/
  │   └── skin-analysis.tsx    # Composant d'exemple
  └── .env.local               # Configuration (à créer)
```

## Endpoints API

### POST `/api/diagnosis/analyze/`

Analyse une vidéo de la peau.

#### Gestion des erreurs améliorée

L'API gère maintenant plusieurs types d'erreurs avec des messages informatifs :

- **429 - Quota API dépassé** : Limite de quota Gemini atteinte
  - Message : "Vous avez atteint la limite de votre quota API Gemini"
  - Action : Réessayer plus tard ou vérifier le plan de facturation
  - Retry automatique : 3 tentatives avec backoff exponentiel

- **401 - Erreur d'authentification** : Clé API invalide
  - Message : "Clé API Gemini invalide ou expirée"
  - Action : Vérifier la configuration de la clé API

- **400 - Format non supporté** : Format vidéo incompatible
  - Message : "Le format de la vidéo n'est pas supporté"
  - Action : Utiliser un format supporté (MP4, AVI, MOV, etc.)

- **413 - Fichier trop volumineux** : Vidéo trop lourde
  - Message : "La vidéo est trop volumineuse pour être traitée"
  - Action : Réduire la taille ou la durée de la vidéo

**Requête:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `{ video: File }`

**Réponse:**
```json
{
  "analyse_temporelle": "Description...",
  "symptomes": ["Symptome 1", "Symptome 2"],
  "diagnostic_possible": "Nom de la condition",
  "confiance": "XX%",
  "conseil": "Conseil d'action",
  "urgence": "Basse|Moyenne|Haute"
}
```

## Dépannage

### Erreur CORS

Si vous rencontrez des erreurs CORS, vérifiez que :
1. Le backend est démarré sur le port 8000
2. Le frontend est démarré sur le port 3000
3. Les deux sont dans `CORS_ALLOWED_ORIGINS` dans `backend/skin_ai/settings.py`

### Erreur de connexion

Si le frontend ne peut pas se connecter au backend :
1. Vérifiez que le backend est démarré
2. Vérifiez l'URL dans `frontend/lib/api-config.ts` ou `.env.local`
3. Vérifiez les logs du backend pour les erreurs

