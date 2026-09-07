from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from user_service.config.database import get_db
from user_service.schemas import (
    ChatResponse,
    ChatRequest,
    MessageCreate,
    ChatCreate,
    ChatConnectorCreate,
)
from user_service.services.chat import list_chats, create_chat
from user_service.services.message import create_message
from user_service.services.chat_connector import create_chat_connectors
from user_service.utils.jwt import get_current_user_id
from user_service.services.llm import call_llm

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)


@router.get("/", response_model=list[ChatResponse])
def list_chats_route(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    return list_chats(db, user_id)


@router.post(
    "/",
    response_model=ChatResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_chat_route(
    chat_data: ChatRequest,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    chat_create = ChatCreate(title="test")
    chat = create_chat(db, chat_create, user_id)
    chat_connector_create = ChatConnectorCreate(
        chat_id=chat.id, connector_ids=chat_data.connector_ids
    )
    create_chat_connectors(db, chat_connector_create)
    message_create = MessageCreate(
        content=chat_data.message, type="text", role="human", chat_id=chat.id
    )
    create_message(
        db,
        message_create,
    )

    content = call_llm(chat_data.message)

    message_create = MessageCreate(
        content=content, type="text", role="ai", chat_id=chat.id
    )
    create_message(
        db,
        message_create,
    )
    return chat
