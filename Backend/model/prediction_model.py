import pickle

def recommend_movies_knn(movie_title, genre, director, model_file, top_n=5):
    """
    Kullanıcının izlemek istediği tür, sevdiği bir yönetmen ve daha önce izlediği bir filme göre öneriler yapar.
    """
    with open(model_file, 'rb') as file:
        data, tfidf, knn = pickle.load(file)

    user_query = f"{genre} {director}"
    if movie_title:
        try:
            movie_idx = data[data['movie_title'] == movie_title].index[0]
            movie_features = data.iloc[movie_idx]['features']
            user_query += f" {movie_features}"
        except IndexError:
            print(f"Film '{movie_title}' veri setinde bulunamadı. Yalnızca tür ve yönetmene göre öneri yapılıyor.")

    query_vector = tfidf.transform([user_query])

    print(f"'{movie_title}' filmi, '{genre}' türü ve '{director}' yönetmenine göre öneriler hesaplanıyor...")
    distances, indices = knn.kneighbors(query_vector, n_neighbors=top_n)

    recommended_movies = [
        data.iloc[i]['movie_title'] for i in indices.flatten()
    ]
    return recommended_movies