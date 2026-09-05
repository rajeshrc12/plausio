from celery import Celery

celery = Celery(
    "user_service",
    broker="redis://localhost:6379/0",
)
