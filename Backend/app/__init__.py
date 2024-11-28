from flask import Flask
from flask_cors import CORS
from app.config import DevelopmentConfig

def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, resources={r"/*": {"origins": "*"}})

    from app.routes import api_blueprint
    app.register_blueprint(api_blueprint)

    return app
