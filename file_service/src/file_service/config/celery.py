from celery import Celery

app = Celery(
    "file_service",
    broker="redis://localhost:6379/0",
)

app.conf.task_default_queue = "file_queue"
