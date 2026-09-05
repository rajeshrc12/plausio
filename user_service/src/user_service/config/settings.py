from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    google_client_id: str

    jwt_secret_key: str
    jwt_algorithm: str
    jwt_expire_minutes: int

    aws_access_key_id: str
    aws_secret_access_key: str
    aws_region: str
    aws_s3_bucket: str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()  # type: ignore[call-arg]
