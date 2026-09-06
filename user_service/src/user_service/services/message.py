from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from user_service.models import Message
from user_service.schemas import MessageCreate


def list_messages(db: Session, chat_id: int):
    statement = (
        select(Message)
        .where(Message.chat_id == chat_id)
        .order_by(Message.created_at.asc())
    )

    return db.scalars(statement).all()


def get_message(db: Session, message_id: int):
    message = db.get(Message, message_id)

    if message is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="message not found",
        )

    return message


def create_message(
    db: Session,
    message_data: MessageCreate,
):
    message = Message(
        content=message_data.content,
        type=message_data.type,
        role=message_data.role,
        chat_id=message_data.chat_id,
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message
