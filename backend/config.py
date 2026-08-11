import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent


def get_cors_origins():
    origins = os.environ.get("CORS_ORIGINS", "*")
    if origins == "*":
        return "*"
    return [origin.strip() for origin in origins.split(",") if origin.strip()]


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        f"sqlite:///{BASE_DIR / 'tasks.db'}",
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ORIGINS = get_cors_origins()
