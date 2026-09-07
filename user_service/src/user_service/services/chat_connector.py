from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from user_service.models import ChatConnector
from user_service.schemas import ChatConnectorCreate


def create_chat_connectors(
    db: Session,
    connector_data: ChatConnectorCreate,
):
    chat_connectors = [
        ChatConnector(
            chat_id=connector_data.chat_id,
            connector_id=connector_id,
        )
        for connector_id in connector_data.connector_ids
    ]

    db.add_all(chat_connectors)
    db.commit()

    for chat_connector in chat_connectors:
        db.refresh(chat_connector)

    return chat_connectors


def list_chat_connectors(
    db: Session,
    chat_id: int,
):

    statement = (
        select(ChatConnector)
        .where(ChatConnector.chat_id == chat_id)
        .options(selectinload(ChatConnector.connector))
        .order_by(ChatConnector.created_at.desc())
    )

    return db.scalars(statement).all()
