from sklearn.metrics.pairwise import cosine_similarity
from app.models import get_model
from app.config import Config
import json

def recommend_movies(topic, director, liked_movie, top_n=5):
    data, sbert_model, embeddings = get_model()

    user_query = f"{topic} {director} {liked_movie}"
    user_embedding = sbert_model.encode([user_query])

    similarities = cosine_similarity(user_embedding, embeddings)
    top_indices = similarities[0].argsort()[-top_n:][::-1]

    recommended_movies = data.iloc[top_indices][['movie_title', 'movie_genres', 'director_names']]
    return recommended_movies.to_dict(orient='records')

def get_genres_data():
    """
    Film türlerini JSON dosyasından alır.
    """
    with open(Config.GENRES_FILE, "r", encoding="utf-8") as file:
        data = json.load(file)
        if isinstance(data, dict) and "unique_movie_genres" in data:
            data = data["unique_movie_genres"]

        if not isinstance(data, list):
            raise TypeError("JSON verisi bir liste olmalıdır.")
    return data

def get_directors_data(limit, offset):
    """
    Yönetmen verilerini JSON dosyasından alır ve part-part döndürür.
    """
    with open(Config.DIRECTORS_FILE, "r", encoding="utf-8") as file:
        data = json.load(file)
        if isinstance(data, dict) and "unique_director_names" in data:
            data = data["unique_director_names"]

        if not isinstance(data, list):
            raise TypeError("JSON verisi bir liste olmalıdır.")

    return data[offset:offset + limit]


def get_movies_data(limit, offset):
    """
    Film verilerini JSON dosyasından alır ve part-part döndürür.
    """
    with open(Config.MOVIES_FILE, "r", encoding="utf-8") as file:
        data = json.load(file)

        if not isinstance(data, list):
            raise TypeError("JSON verisi bir liste olmalıdır.")

    return data[offset:offset + limit]