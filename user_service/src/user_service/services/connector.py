from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from user_service.models import Connector
from user_service.schemas import ConnectorCreate


def list_connectors(db: Session, user_id: int):
    statement = (
        select(Connector)
        .where(Connector.user_id == user_id)
        .order_by(Connector.created_at.desc())
        .limit(10)
    )

    return db.scalars(statement).all()


def get_connector(db: Session, connector_id: int):
    connector = db.get(Connector, connector_id)

    if connector is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Connector not found",
        )

    return connector


def create_connector(
    db: Session,
    connector_data: ConnectorCreate,
    user_id: int,
):
    connector = Connector(
        user_id=user_id,
        name=connector_data.name,
        title=connector_data.title,
        description=connector_data.description,
        status="INIT",
        type=connector_data.type,
    )

    db.add(connector)
    db.commit()
    db.refresh(connector)

    return connector
