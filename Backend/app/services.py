from sklearn.metrics.pairwise import cosine_similarity
from app.models import get_model

def recommend_movies(topic, director, liked_movie, top_n=5):
    """
    Kullanıcı girdisine göre film önerisi yapar.
    """
    data, sbert_model, embeddings = get_model()

    user_query = f"{topic} {director} {liked_movie}"
    user_embedding = sbert_model.encode([user_query])

    similarities = cosine_similarity(user_embedding, embeddings)
    top_indices = similarities[0].argsort()[-top_n:][::-1]

    recommended_movies = data.iloc[top_indices][['movie_title', 'movie_genres', 'director_names']]
    return recommended_movies.to_dict(orient='records')
