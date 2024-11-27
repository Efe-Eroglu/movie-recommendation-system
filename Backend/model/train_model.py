import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import pickle

def train_and_save_model_knn(data, model_file, n_neighbors=10):
    """
    KNN ile film öneri sistemi modeli oluştur ve kaydet.
    """
    print("Özellikler oluşturuluyor...")
    # Özellikler sadece tür (genre) ve film açıklamasından oluşturuluyor
    data['features'] = data['movie_genres'] + ' ' + data['movie_description']

    print("TF-IDF hesaplanıyor...")
    tfidf = TfidfVectorizer(
        max_features=20000,  # Özellik sayısını sınırlama
        ngram_range=(1, 2),  # Unigram ve bigram
        stop_words='english',  # İngilizce durdurma kelimelerini filtrele
        max_df=0.8,  # Çok sık geçen kelimeleri filtrele
        min_df=5  # Çok nadir geçen kelimeleri filtrele
    )
    tfidf_matrix = tfidf.fit_transform(data['features'])
    print("TF-IDF tamamlandı.")

    print("KNN modeli oluşturuluyor...")
    knn = NearestNeighbors(metric='cosine', algorithm='auto', n_neighbors=n_neighbors)
    knn.fit(tfidf_matrix)
    print("KNN modeli eğitildi.")

    print("Model kaydediliyor...")
    with open(model_file, 'wb') as file:
        pickle.dump((data, tfidf, knn), file)
    print(f"Model başarıyla kaydedildi: {model_file}")

if __name__ == "__main__":
    input_file = "..\data\movies.csv"  # Veri dosyası
    model_file = "model.pkl"  # Kaydedilecek model dosyası

    print("Veri yükleniyor...")
    data = pd.read_csv(input_file)

    print("Model eğitimi başlıyor...")
    train_and_save_model_knn(data, model_file)
