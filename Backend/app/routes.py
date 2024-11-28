from flask import Blueprint, request, jsonify
from app.services import recommend_movies

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/recommend', methods=['POST'])
def recommend():
    """
    Kullanıcıdan gelen POST isteği ile tahmin yapar.
    """
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
