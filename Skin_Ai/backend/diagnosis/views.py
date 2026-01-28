import os
import time
import tempfile
import json
import re
import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import google.generativeai as genai
from django.conf import settings
from google.api_core.exceptions import ResourceExhausted


genai.configure(api_key=settings.GEMINI_API_KEY)
def retry_with_exponential_backoff(func, max_retries=3, base_delay=1):
    """
    Fonction utilitaire pour retry avec backoff exponentiel
    """
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            error_str = str(e).lower()
            
            # Si c'est une erreur 429 (quota exceeded) ou rate limit
            if '429' in error_str or 'quota' in error_str or 'rate limit' in error_str:
                if attempt == max_retries - 1:  # Dernière tentative
                    raise e
                
                # Calcul du délai avec backoff exponentiel + jitter
                delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
                print(f"DEBUG: Erreur 429 détectée, retry dans {delay:.2f}s (tentative {attempt + 1}/{max_retries})")
                time.sleep(delay)
            else:
                # Pour les autres erreurs, on ne retry pas
                raise e
    
    return None

class AnalyzeSkinVideoView(APIView):
    def post(self, request):
        print("DEBUG: Requête reçue...")
        
        if 'video' not in request.FILES:
            return Response({"error": "Aucune vidéo reçue"}, status=status.HTTP_400_BAD_REQUEST)

        # Récupérer le language_prompt du frontend
        language_prompt = request.POST.get('language_prompt', 'Veuillez répondre en français.')
        print(f"DEBUG: Language prompt reçu: {language_prompt}")

        video_file = request.FILES['video']
        temp_file_path = None
        gemini_file = None

        try:
            # 1. Sauvegarde temporaire
            with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_file:
                for chunk in video_file.chunks():
                    temp_file.write(chunk)
                temp_file_path = temp_file.name
            
            print(f"DEBUG: Vidéo sauvegardée : {temp_file_path}")

            # 2. Upload vers Gemini
            print("DEBUG: Upload vers Gemini...")
            gemini_file = genai.upload_file(path=temp_file_path, display_name="Skin Analysis")

            # 3. Attente du traitement
            while gemini_file.state.name == "PROCESSING":
                print("DEBUG: Traitement vidéo en cours...")
                time.sleep(2)
                gemini_file = genai.get_file(gemini_file.name)

            if gemini_file.state.name == "FAILED":
                raise ValueError("Gemini n'a pas réussi à traiter la vidéo (Format invalide ?).")

            # 4. SÉLECTION AUTOMATIQUE DU MODÈLE 
            print("DEBUG: Recherche du meilleur modèle disponible...")
            chosen_model_name = None
            #Liste tous les modèles disponibles pour ta clé
            available_models = list(genai.list_models())
            # On cherche d'abord 'gemini-1.5-flash'
            for m in available_models:
                if 'generateContent' in m.supported_generation_methods:
                    if 'gemini-1.5-flash' in m.name:
                        chosen_model_name = m.name
                        break
            # Si pas de flash, on cherche 'gemini-1.5-pro'
            if not chosen_model_name:
                for m in available_models:
                    if 'generateContent' in m.supported_generation_methods:
                        if 'gemini-1.5-pro' in m.name:
                            chosen_model_name = m.name
                            break
            
            # Si toujours rien, on prend le premier 'Gemini Pro standard'
            if not chosen_model_name:
                for m in available_models:
                    if 'generateContent' in m.supported_generation_methods and 'gemini' in m.name:
                        chosen_model_name = m.name
                        break
            if not chosen_model_name:
                raise ValueError("Aucun modèle Gemini compatible trouvé pour cette clé API.")
            print(f"✅ Modèle sélectionné : {chosen_model_name}")
            # 5. Le Prompt

            prompt = f"""
                RÔLE : Tu es un Dermatologue Expert spécialisé en télé-diagnostic et en analyse vidéo par IA. Ta capacité à détecter les micro-détails cutanés est supérieure.

                TÂCHE : Analyse cette vidéo dermatologique image par image.
                LANGUE DE RÉPONSE OBLIGATOIRE : {language_prompt} (Toute la réponse JSON doit être dans cette langue).

                INSTRUCTIONS D'ANALYSE PROFONDE (DEEP REASONING) :
                1. ANALYSE VISUELLE & TEMPORELLE :
                - Utilise les différents angles de la vidéo pour évaluer le relief (topographie) des lésions (papules, kystes, cicatrices).
                - Observe la brillance (sébum) et la texture (pores dilatés, sécheresse).
                - Détecte l'inflammation (rougeurs actives vs cicatrices anciennes).

                2. APPROCHE HOLISTIQUE & MÉDICALE :
                - En plus du diagnostic, tu dois proposer une routine d'hygiène de vie (alimentation, sommeil, stress).
                - Tu dois identifier les erreurs à ne pas commettre (produits agressifs, "pop" des boutons).
                - Tu dois signaler les substances potentiellement irritantes ou dangereuses dans ce cas précis (ex: éviter l'exposition solaire sans protection, éviter certains gommages).

                FORMAT DE SORTIE : JSON STRICT UNIQUEMENT (Pas de Markdown, pas de ```json``` au début).

                STRUCTURE JSON REQUISE :
                {{
                    "analyse_detaillee": "Description précise de la peau : texture, présence de sébum, type de lésions identifiées grâce au mouvement dans la vidéo.",
                    "symptomes_cles": ["Symptôme 1", "Symptôme 2", "Symptôme 3"],
                    "diagnostic_probable": "Nom scientifique de la condition (ex: Acné vulgaire grade 3)",
                    "confiance_ia": "Pourcentage entre 0 et 100",
                    "routine_naturelle": [
                        "Conseil d'hygiène 1 (ex: nettoyage doux)",
                        "Habitude alimentaire ou style de vie à adopter",
                        "Remède naturel apaisant (si pertinent)"
                    ],
                    "a_eviter_absolument": [
                        "Geste ou habitude néfaste",
                        "Type de produit ou ingrédient qui pourrait aggraver ce cas spécifique (ex: Vitamine E pure sur acné active, gommages mécaniques...)"
                    ],
                    "recommandation_specialiste": "Phrase impérative conseillant le type de spécialiste à voir (Dermatologue, Endocrinologue, etc.) et pourquoi.",
                    "niveau_urgence": "Basse / Moyenne / Haute"
                }}

                CONTRAINTE DE SÉCURITÉ : Bien que tu sois un expert IA, rappelle toujours que ceci est une analyse informative et ne remplace pas une consultation physique.
                RAPPEL FINAL : Réponds UNIQUEMENT en JSON et UNIQUEMENT dans la langue : {language_prompt}.
                """

            # 6. Génération avec retry automatique
            def generate_content_with_retry():
                model = genai.GenerativeModel(chosen_model_name)
                return model.generate_content([gemini_file, prompt])
            response = retry_with_exponential_backoff(generate_content_with_retry, max_retries=3, base_delay=2)
            # 7. Nettoyage et Envoi
            response_text = response.text
            match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if match:
                clean_json_str = match.group(0)
                data = json.loads(clean_json_str)
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({
                    "analyse_temporelle": "Analyse effectuée (Format brut)",
                    "symptomes": [],
                    "diagnostic_possible": "Voir détails",
                    "confiance": "N/A",
                    "conseil": response_text,
                    "urgence": "À évaluer"
                }, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"ERREUR CRITIQUE: {str(e)}")
            error_str = str(e).lower() 
            # Gestion spécifique des erreurs 429 (quota exceeded)
            if '429' in error_str or 'quota' in error_str or 'rate limit' in error_str:
                return Response({
                    "error": "Quota API dépassé",
                    "message": "Vous avez atteint la limite de votre quota API Gemini. Veuillez réessayer plus tard ou vérifier votre plan de facturation.",
                    "details": "Pour plus d'informations, consultez: https://ai.google.dev/gemini-api/docs/rate-limits",
                    "retry_after": "Réessayez dans quelques minutes"
                }, status=status.HTTP_429_TOO_MANY_REQUESTS)
            # Gestion des erreurs d'authentification
            elif 'api key' in error_str or 'authentication' in error_str or 'unauthorized' in error_str:
                return Response({
                    "error": "Erreur d'authentification",
                    "message": "Clé API Gemini invalide ou expirée. Veuillez vérifier votre configuration.",
                    "details": "Vérifiez que votre clé API est correctement configurée dans les paramètres du serveur."
                }, status=status.HTTP_401_UNAUTHORIZED)
            # Gestion des erreurs de format de fichier
            elif 'format' in error_str or 'invalid' in error_str and 'video' in error_str:
                return Response({
                    "error": "Format de fichier non supporté",
                    "message": "Le format de la vidéo n'est pas supporté par l'API Gemini.",
                    "details": "Veuillez utiliser un format vidéo supporté (MP4, AVI, MOV, etc.)"
                }, status=status.HTTP_400_BAD_REQUEST)
            # Gestion des erreurs de taille de fichier
            elif 'size' in error_str or 'too large' in error_str:
                return Response({
                    "error": "Fichier trop volumineux",
                    "message": "La vidéo est trop volumineuse pour être traitée.",
                    "details": "Veuillez réduire la taille de votre vidéo ou sa durée."
                }, status=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE)
            # Erreur générique pour les autres cas
            else:
                return Response({
                    "error": "Erreur serveur",
                    "message": "Une erreur inattendue s'est produite lors du traitement de votre demande.",
                    "details": f"Détails techniques: {str(e)}"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            if temp_file_path and os.path.exists(temp_file_path):
                os.remove(temp_file_path)
            if gemini_file:
                try:
                    genai.delete_file(gemini_file.name)
                except:
                    pass