import pytest
from app import create_app

@pytest.fixture
def app():
    app = create_app()
    yield app

@pytest.fixture
def client(app):
    return app.test_client()

# Test 1: /genres API'nin doğru şekilde çalışıp çalışmadığını test etme
def test_get_genres(client):
    response = client.get('/genres')
    assert response.status_code == 200
    assert 'unique_movie_genres' in response.json

# Test 2: /recommend API'sinin doğru çalışıp çalışmadığını test etme
def test_recommend_movies(client):
    data = {
        'topic': 'Action',
        'director': 'Christopher Nolan',
        'liked_movie': 'Inception'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    assert 'recommendations' in response.json
    assert len(response.json['recommendations']) > 0

# Test 3: Eksik parametre gönderildiğinde doğru hata mesajını döndürüp döndürmediğini test etme
def test_missing_parameters(client):
    data = {
        'topic': '',
        'director': 'Christopher Nolan',
        'liked_movie': 'Inception'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 400
    assert 'error' in response.json

# Test 4: Hatalı JSON gönderildiğinde doğru hata mesajını döndürüp döndürmediğini test etme
def test_invalid_json(client):
    # Geçersiz JSON (sonunda kapanmamış süslü parantez)
    data = '{"topic": "Action", "director": "Christopher Nolan", "liked_movie": "Inception"'
    response = client.post('/recommend', data=data, content_type='application/json')

    # Geçersiz JSON verisi durumunda 400 hata kodu alındığını kontrol et
    assert response.status_code == 400
    assert 'error' in response.json  # 'error' anahtarının döndüğünü kontrol et
    assert response.json['error'] == 'Geçersiz JSON formatı'



# Test 5: /directors API'sinde sayfalama testi
def test_get_directors_with_pagination(client):
    response = client.get('/directors?limit=5&offset=0')
    assert response.status_code == 200
    assert len(response.json) == 5  # Sayfalama sonucu 5 yönetmen dönmeli

    response = client.get('/directors?limit=5&offset=5')
    assert response.status_code == 200
    assert len(response.json) == 5  # Sayfalama sonucu 5 yönetmen daha dönmeli

# Test 6: /movies API'sinde sayfalama testi
def test_get_movies_with_pagination(client):
    response = client.get('/movies?limit=5&offset=0')
    assert response.status_code == 200
    assert len(response.json) == 5  # Sayfalama sonucu 5 film dönmeli

    response = client.get('/movies?limit=5&offset=5')
    assert response.status_code == 200
    assert len(response.json) == 5  # Sayfalama sonucu 5 film daha dönmeli

# Test 7: /genres API'sinde büyük veri testi
def test_large_data_genres(client):
    response = client.get('/genres')
    assert response.status_code == 200
    assert len(response.json['unique_movie_genres']) > 0  # En az bir tür olmalı

# Test 8: /recommend API'sinde öneri verisi doğru formatta mı?
def test_recommend_movies_format(client):
    data = {
        'topic': 'Sci-Fi',
        'director': 'Ridley Scott',
        'liked_movie': 'Blade Runner'
    }
    response = client.post('/recommend', json=data)
    assert response.status_code == 200
    recommendations = response.json['recommendations']
    assert isinstance(recommendations, list)
    assert len(recommendations) > 0
    for rec in recommendations:
        assert 'movie_title' in rec
        assert 'movie_genres' in rec
        assert 'director_names' in rec

