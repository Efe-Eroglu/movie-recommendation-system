def filter_movies_by_preferences(data, genres=None):
    """
    Türlere göre film listesini filtreler.
    """
    filtered_data = data
    if genres:
        filtered_data = filtered_data[filtered_data['movie_genres'].str.contains('|'.join(genres), case=False)]
    return filtered_data

def calculate_combined_score(filtered_data, movie_features, tfidf, knn, top_k=10):
    """
    Filtrelenmiş veriye göre öneriler oluşturur.
    """
    tfidf_matrix = tfidf.transform(filtered_data['features'])
    knn.fit(tfidf_matrix)

    n_neighbors = min(top_k, len(filtered_data))
    if n_neighbors == 0:
        return pd.DataFrame()
    distances, indices = knn.kneighbors(movie_features, n_neighbors=n_neighbors)

    recommendations = filtered_data.iloc[indices[0]].copy()
    recommendations['distance'] = distances[0]
    return recommendations.sort_values('distance', ascending=True)
