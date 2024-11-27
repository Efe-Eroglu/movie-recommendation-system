import pickle
import pandas as pd
from model.helpers import filter_movies_by_preferences, calculate_combined_score

def recommend_movies_knn(movie_title, genre, model_file, top_n=5):
    """
    Kullanıcının seçtiği tür ve izlediği film ile öneriler oluşturur.
    """
    try:
        with open(model_file, 'rb') as file:
            data, tfidf, knn = pickle.load(file)
    except FileNotFoundError:
        raise FileNotFoundError("Model dosyası bulunamadı.")

    filtered_data = filter_movies_by_preferences(data, genres=[genre])
    if filtered_data.empty:
        return []

    if movie_title:
        try:
            movie_index = data[data['movie_title'] == movie_title].index[0]
        except IndexError:
            raise ValueError(f"İzlenen film bulunamadı: {movie_title}")

        movie_features = tfidf.transform([data.iloc[movie_index]['features']])

        n_neighbors = min(top_n, len(filtered_data))
        knn.n_neighbors = n_neighbors
        tfidf_matrix = tfidf.transform(filtered_data['features'])
        knn.fit(tfidf_matrix)

        distances, indices = knn.kneighbors(movie_features, n_neighbors=n_neighbors)

        recommendations = filtered_data.iloc[indices[0]].copy()
        recommendations['distance'] = distances[0]
        recommendations = recommendations.sort_values('distance', ascending=True)
        return recommendations[['movie_title', 'movie_genres', 'rating']].to_dict(orient='records')

    return filtered_data.head(top_n)[['movie_title', 'movie_genres', 'rating']].to_dict(orient='records')
