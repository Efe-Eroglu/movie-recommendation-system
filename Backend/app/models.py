import pickle
from app.config import MODEL_FILE

def get_model():
    """
    Model ve embedding'leri yükler.
    """
    with open(MODEL_FILE, 'rb') as file:
        data, sbert_model, embeddings = pickle.load(file)
    return data, sbert_model, embeddings
