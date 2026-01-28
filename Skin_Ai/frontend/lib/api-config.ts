// Configuration de l'API backend
export const API_CONFIG = {
  // URL de base du backend Django
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  
  // Endpoints
  ENDPOINTS: {
    DIAGNOSIS: '/api/diagnosis/analyze/',
  },
  
  // Timeout pour les requêtes (en millisecondes)
  TIMEOUT: 300000, // 5 minutes pour l'analyse vidéo
};

// Fonction helper pour construire l'URL complète
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

