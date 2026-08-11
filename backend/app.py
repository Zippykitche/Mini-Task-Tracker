from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from extensions import db
from models import Task  # noqa: F401
from routes import tasks_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.url_map.strict_slashes = False

    CORS(app, origins=app.config["CORS_ORIGINS"])
    db.init_app(app)

    app.register_blueprint(tasks_bp, url_prefix="/tasks")
    app.register_blueprint(tasks_bp, url_prefix="/api/tasks", name="tasks_api")

    @app.get("/")
    @app.get("/api")
    def health_check():
        return jsonify({
            "status": "ok",
            "message": "Mini Task Tracker API is running",
            "endpoints": {
                "tasks": "/api/tasks"
            }
        }), 200

    @app.cli.command("init-db")
    def init_db():
        db.create_all()
        print("Database tables created successfully.")

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
