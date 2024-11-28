import pickle
from app.config import Config

def get_model():
    """
    Model ve embedding'leri yükler.
    """
    try:
        with open(Config.MODEL_FILE, 'rb') as file:
            data, sbert_model, embeddings = pickle.load(file)
        return data, sbert_model, embeddings
    except FileNotFoundError:
        raise FileNotFoundError(f"Model dosyası bulunamadı: {Config.MODEL_FILE}")
    except Exception as e:
        raise RuntimeError(f"Model yüklenirken bir hata oluştu: {str(e)}")
