from flask import Flask, request, jsonify
from flask_cors import CORS
from model.prediction_model import recommend_movies_knn

app = Flask(__name__)
CORS(app)

MODEL_FILE = "static/model.pkl"

@app.route('/recommend', methods=['POST'])
def recommend():
    """
    Kullanıcının gönderdiği tür ve önceki film ile öneri yapar.
    """
    try:
        data = request.json
        movie_title = data.get('previousMovie', '')
        genre = data.get('genre', '')

        recommendations = recommend_movies_knn(
            movie_title=movie_title,
            genre=genre,
            model_file=MODEL_FILE,
            top_n=5
        )

        if not recommendations:
            return jsonify({
                "status": "error",
                "message": "Filtreleme sonrası yeterli veri bulunamadı."
            }), 404

        return jsonify({
            "status": "success",
            "recommendations": recommendations
        })

    except ValueError as ve:
        return jsonify({
            "status": "error",
            "message": str(ve)
        }), 400
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
