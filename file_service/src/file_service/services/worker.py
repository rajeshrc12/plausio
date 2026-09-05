from file_service.config.celery import app


@app.task(name="process_file")
def process_file(id: str, type: str):
    print(f"Processing file: {id}")
    print(f"Type: {type}")
    return {"id": id, "type": type}
