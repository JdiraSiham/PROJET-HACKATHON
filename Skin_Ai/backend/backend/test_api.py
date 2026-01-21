import requests

# L'adresse de ton API locale
url = 'http://127.0.0.1:8000/api/diagnosis/analyze/'

# Le fichier vidéo à envoyer
file_path = 'test.mp4'

print(f"🚀 Envoi de {file_path} vers l'IA...")

try:
    # On ouvre la vidéo et on l'envoie (POST)
    with open(file_path, 'rb') as f:
        files = {'video': f}
        response = requests.post(url, files=files)

    # Résultat
    print(f"Statut : {response.status_code}")
    print("-" * 30)
    print("🤖 RÉPONSE DE GEMINI :")
    print(response.text)
    print("-" * 30)

except FileNotFoundError:
    print("❌ Erreur : Je ne trouve pas le fichier 'test.mp4'. Vérifie qu'il est bien là.")
except Exception as e:
    print(f"❌ Erreur de connexion : {e}")