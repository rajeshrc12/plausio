from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from user_service.config.database import get_db
from user_service.schemas import (
    ConnectorResponse,
    ConnectorCreate,
    ConnectorUploadResponse,
)
from user_service.services.connector import list_connectors, create_connector
from user_service.utils.jwt import get_current_user_id
from user_service.services.s3 import create_presigned_upload_url

router = APIRouter(
    prefix="/connector",
    tags=["connector"],
)


@router.get("/", response_model=list[ConnectorResponse])
def list_connector_route(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    return list_connectors(db, user_id)


@router.post(
    "/",
    response_model=ConnectorUploadResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_connector_route(
    connector_data: ConnectorCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    connector = create_connector(db, connector_data, user_id)

    upload = create_presigned_upload_url(connector.id, connector.type)

    data = {
        "id": connector.id,
        "name": connector.name,
        "title": connector.title,
        "description": connector.description,
        "status": connector.status,
        "type": connector.type,
        "url": upload["url"],
        "key": upload["key"],
    }

    return data
