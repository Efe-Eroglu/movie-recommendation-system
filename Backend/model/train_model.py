import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import pickle

def train_and_save_model_knn(data, model_file, n_neighbors=10):
    """
    KNN ile film öneri sistemi modeli oluştur ve kaydet.
    """
    print("TF-IDF hesaplanıyor...")
    tfidf = TfidfVectorizer(max_features=20000)
    tfidf_matrix = tfidf.fit_transform(data['features'])
    print("TF-IDF tamamlandı.")

    print("KNN modeli oluşturuluyor...")
    knn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=n_neighbors)
    knn.fit(tfidf_matrix)
    print("KNN modeli eğitildi.")
    print("Model kaydediliyor...")
    with open(model_file, 'wb') as file:
        pickle.dump((data, tfidf, knn), file)
    print(f"Model başarıyla kaydedildi: {model_file}")

if __name__ == "__main__":
    input_file = "cleaned_movies_data.csv"
    model_file = "recommendation.pkl"

    print("Veri yükleniyor...")
    data = pd.read_csv(input_file)

    print("Veri işleniyor...")
    data['features'] = data['movie_genres'] + ' ' + data['director_names']
    print("Veri işleme tamamlandı.")

    train_and_save_model_knn(data, model_file)
