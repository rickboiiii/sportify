from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

dot_env_exists = load_dotenv(".env")


class Settings(BaseSettings):
    app_name: str = "Sportify"
    postgres_server: str = "localhost"
    postgres_port: int = 5432
    postgres_database: str = "app"
    postgres_user: str = "postgres"
    postgres_password: str = "changethis"
    jwt_secret_key: str = "your_secret_key"
    jwt_algorithm: str = "HS256"
    jwt_refresh_token_expires_in: int = 60


def dot_env(key: str):
    return os.getenv(key)


def get_database_url():
    if dot_env_exists:
        return dot_env("POSTGRES_USER") + ":" + dot_env("POSTGRES_PASSWORD") + "@" + dot_env("POSTGRES_SERVER") + "/" + dot_env("POSTGRES_DB")
    return Settings().postgres_user + ":" + Settings().postgres_password + "@" + Settings().postgres_server + "/" + Settings().postgres_database
