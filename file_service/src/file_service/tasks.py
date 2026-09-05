from .celery_app import app


@app.task
def process_file(file_id: str, file_type: str):
    print(f"Processing file: id={file_id}, type={file_type}")

    return {
        "file_id": file_id,
        "file_type": file_type,
        "status": "processed",
    }
