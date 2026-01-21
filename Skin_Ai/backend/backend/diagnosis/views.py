import os
import time
import tempfile
import json
import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import google.generativeai as genai
from django.conf import settings

# Configuration
genai.configure(api_key=settings.GEMINI_API_KEY)

class AnalyzeSkinVideoView(APIView):
    def post(self, request):
        print("DEBUG: Requête reçue...")
        
        if 'video' not in request.FILES:
            return Response({"error": "Aucune vidéo reçue"}, status=status.HTTP_400_BAD_REQUEST)

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

            # 4. SÉLECTION AUTOMATIQUE DU MODÈLE (La solution est ICI)
            print("DEBUG: Recherche du meilleur modèle disponible...")
            chosen_model_name = None
            
            # On liste tous les modèles disponibles pour ta clé
            available_models = list(genai.list_models())
            
            # On cherche d'abord 'gemini-1.5-flash' (le plus rapide pour la vidéo)
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
            
            # Si toujours rien, on prend le premier qui marche (Gemini Pro standard)
            if not chosen_model_name:
                for m in available_models:
                    if 'generateContent' in m.supported_generation_methods and 'gemini' in m.name:
                        chosen_model_name = m.name
                        break
            
            if not chosen_model_name:
                raise ValueError("Aucun modèle Gemini compatible trouvé pour cette clé API.")

            print(f"✅ Modèle sélectionné : {chosen_model_name}")

            # 5. Le Prompt
            prompt = """
            Tu es un dermatologue IA expert. Analyse cette vidéo.
            Format de sortie : JSON UNIQUEMENT, sans Markdown.
            Structure requise :
            {
                "analyse_temporelle": "Description des changements de lumière/relief...",
                "symptomes": ["Symptome 1", "Symptome 2"],
                "diagnostic_possible": "Nom de la condition",
                "confiance": "XX%",
                "conseil": "Conseil d'action",
                "urgence": "Basse/Moyenne/Haute"
            }
            """

            # 6. Génération
            model = genai.GenerativeModel(chosen_model_name)
            response = model.generate_content([gemini_file, prompt])

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
            # On affiche l'erreur détaillée pour comprendre
            return Response({"error": f"Erreur serveur: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        finally:
            if temp_file_path and os.path.exists(temp_file_path):
                os.remove(temp_file_path)
            if gemini_file:
                try:
                    genai.delete_file(gemini_file.name)
                except:
                    pass