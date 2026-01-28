import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ ERREUR : Clé API non trouvée dans .env")
else:
    print(f"✅ Clé trouvée : {api_key[:5]}...")
    genai.configure(api_key=api_key)

    print("\n🔍 RECHERCHE DES MODÈLES DISPONIBLES...")
    print("-" * 40)
    found_any = False
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"🌟 DISPONIBLE : {m.name}")
                found_any = True
    except Exception as e:
        print(f"❌ Erreur lors de la connexion à Google : {e}")

    if not found_any:
        print("⚠️ Aucun modèle trouvé. Vérifie que ta clé API est active sur Google AI Studio.")
    else:
        print("-" * 40)
        print("👉 COPIE un des noms ci-dessus (ex: 'models/gemini-1.5-flash') et mets-le dans views.py")