from user_service.config.celery import celery


def create_job(id: int, type: str):
    return celery.send_task(
        "process_file",
        args=[id, type],
        queue="file_queue",
    )
