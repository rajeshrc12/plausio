from celery import Celery

app = Celery(
    "file_service",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1",
)

app.conf.task_serializer = "json"
app.conf.accept_content = ["json"]
app.conf.result_serializer = "json"
