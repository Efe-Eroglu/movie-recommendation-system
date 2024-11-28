from flask import Blueprint, request, jsonify
from werkzeug.exceptions import BadRequest
from app.services import recommend_movies, get_genres_data, get_directors_data, get_movies_data

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/recommend', methods=['POST'])
def recommend():
    try:
        # JSON verisini almak ve geçersiz JSON hatasını yakalamak
        if not request.is_json:  # Eğer gelen veri JSON değilse
            return jsonify({"error": "Geçersiz JSON formatı"}), 400

        user_input = request.json
        if not user_input:  # Eğer JSON içeriği boşsa
            return jsonify({"error": "Boş JSON verisi gönderildi."}), 400

        topic = user_input.get('topic', '')
        director = user_input.get('director', '')
        liked_movie = user_input.get('liked_movie', '')

        if not topic or not director or not liked_movie:
            return jsonify({"error": "'topic', 'director' ve 'liked_movie' sağlanmalıdır."}), 400

        recommendations = recommend_movies(topic, director, liked_movie)
        return jsonify({"recommendations": recommendations})

    except BadRequest as e:
        # Geçersiz JSON hatasını yakalamak
        return jsonify({"error": "Geçersiz JSON formatı"}), 400
    except Exception as e:
        return jsonify({"error": f"Bir hata oluştu: {str(e)}"}), 500


@api_blueprint.route("/genres", methods=["GET"])
def get_genres():
    try:
        genres_data = get_genres_data()  
        return jsonify({"unique_movie_genres": genres_data})
    except Exception as e:
        return jsonify({"error": f"Film türleri alınırken hata oluştu: {str(e)}"}), 500


@api_blueprint.route("/directors", methods=["GET"])
def get_directors():
    try:
        limit = int(request.args.get('limit', 10))
        offset = int(request.args.get('offset', 0))
    except ValueError:
        return jsonify({"error": "Geçersiz limit veya offset değerleri!"}), 400

    try:
        directors_data = get_directors_data(limit, offset)
        return jsonify(directors_data)
    except Exception as e:
        return jsonify({"error": f"Yönetmen verileri alınırken hata oluştu: {str(e)}"}), 500


@api_blueprint.route("/movies", methods=["GET"])
def get_movies():
    try:
        limit = int(request.args.get('limit', 10))
        offset = int(request.args.get('offset', 0))
    except ValueError:
        return jsonify({"error": "Geçersiz limit veya offset değerleri!"}), 400

    try:
        movies_data = get_movies_data(limit, offset)
        return jsonify(movies_data)
    except Exception as e:
        return jsonify({"error": f"Film verileri alınırken hata oluştu: {str(e)}"}), 500
