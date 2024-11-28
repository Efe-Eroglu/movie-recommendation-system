from flask import Blueprint, request, jsonify
from app.services import recommend_movies, get_genres_data, get_directors_data, get_movies_data

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/recommend', methods=['POST'])
def recommend():
    user_input = request.json
    topic = user_input.get('topic', '')
    director = user_input.get('director', '')
    liked_movie = user_input.get('liked_movie', '')

    if not topic or not director or not liked_movie:
        return jsonify({"error": "Eksik girdi! 'topic', 'director' ve 'liked_movie' sağlanmalıdır."}), 400

    try:
        recommendations = recommend_movies(topic, director, liked_movie)
        return jsonify({"recommendations": recommendations})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_blueprint.route("/directors", methods=["GET"])
def get_directors():
    try:
        limit = int(request.args.get('limit', 10))
        offset = int(request.args.get('offset', 0))
    except ValueError:
        return jsonify({"error": "Geçersiz limit veya offset değerleri!"}), 400
    return jsonify(get_directors_data(limit, offset))

@api_blueprint.route("/movies", methods=["GET"])
def get_movies():
    try:
        limit = int(request.args.get('limit', 10))
        offset = int(request.args.get('offset', 0))
    except ValueError:
        return jsonify({"error": "Geçersiz limit veya offset değerleri!"}), 400
    return jsonify(get_movies_data(limit, offset))

@api_blueprint.route("/genres", methods=["GET"])
def get_genres():
    """
    Film türlerini döndürür.
    """
    try:
        genres = get_genres_data()
        return jsonify({"unique_movie_genres": genres})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
