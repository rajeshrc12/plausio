from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from user_service.models import Chat
from user_service.schemas import ChatCreate


def list_chats(db: Session, user_id: int):
    statement = (
        select(Chat)
        .where(Chat.user_id == user_id)
        .order_by(Chat.created_at.desc())
        .limit(10)
    )

    return db.scalars(statement).all()


def get_chat(db: Session, chat_id: int):
    chat = db.get(Chat, chat_id)

    if chat is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="chat not found",
        )

    return chat


def create_chat(
    db: Session,
    chat_data: ChatCreate,
    user_id: int,
):
    chat = Chat(
        user_id=user_id,
        title=chat_data.title,
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    return chat
