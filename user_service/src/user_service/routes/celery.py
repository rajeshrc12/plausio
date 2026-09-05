from fastapi import APIRouter, status
from user_service.schemas import CeleryCreate, CeleryResponse
from user_service.services.celery import create_job

router = APIRouter(
    prefix="/celery",
    tags=["celery"],
)


@router.post(
    "/",
    response_model=CeleryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_job_route(
    celery_data: CeleryCreate,
):
    job = create_job(celery_data.id, celery_data.type)
    print("create_job_route", job)
    data = {
        "id": celery_data.id,
        "type": celery_data.type,
    }

    return data
