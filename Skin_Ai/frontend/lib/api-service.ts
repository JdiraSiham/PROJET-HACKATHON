import { API_CONFIG, getApiUrl } from './api-config';

// --- MISE À JOUR CRITIQUE : NOUVELLE INTERFACE ---
// Elle correspond exactement au JSON du prompt "Superchargé"
export interface DiagnosisResponse {
  analyse_detaillee: string;        // Remplace analyse_temporelle
  symptomes_cles: string[];         // Remplace symptomes
  diagnostic_probable: string;      // Remplace diagnostic_possible
  confiance_ia: string;             // Remplace confiance
  routine_naturelle: string[];      // NOUVEAU
  a_eviter_absolument: string[];    // NOUVEAU
  recommandation_specialiste: string; // NOUVEAU
  niveau_urgence: string;           // Remplace urgence
}

export interface ApiError {
  error: string;
  message?: string;
}

class ApiService {
  async analyzeSkinVideo(videoFile: File, languagePrompt?: string): Promise<DiagnosisResponse> {
    const formData = new FormData();
    formData.append('video', videoFile);
    
    if (languagePrompt) {
      formData.append('language_prompt', languagePrompt);
    }

    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.DIAGNOSIS), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          error: `Erreur HTTP: ${response.status} ${response.statusText}`,
        }));
        throw new Error(errorData.error || `Erreur ${response.status}`);
      }

      const data: DiagnosisResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erreur inconnue lors de l\'analyse de la vidéo');
    }
  }

  async checkBackendHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/admin/`, {
        method: 'HEAD',
        mode: 'no-cors',
      });
      return true;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();
export default apiService;