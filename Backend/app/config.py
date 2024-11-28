import os

class Config:
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    MODEL_FILE = os.getenv("MODEL_FILE", os.path.join(BASE_DIR, '../data/sbert_model.pkl'))
    GENRES_FILE = os.getenv("GENRES_FILE", os.path.join(BASE_DIR, "../data/movie_genres.json"))
    DIRECTORS_FILE = os.getenv("DIRECTORS_FILE", os.path.join(BASE_DIR, "../data/director_names.json"))
    MOVIES_FILE = os.getenv("MOVIES_FILE", os.path.join(BASE_DIR, "../data/movies.json"))

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
