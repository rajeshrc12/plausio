from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import inspect
from user_service.config.database import get_db
from user_service.schemas import ChatConnectorResponse
from user_service.services.chat_connector import (
    list_chat_connectors,
)
from user_service.utils.jwt import get_current_user_id

router = APIRouter(
    prefix="/chat-connector",
    tags=["chat-connector"],
)


@router.get("/{chat_id}", response_model=list[ChatConnectorResponse])
def list_chat_connectors_route(
    chat_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    return list_chat_connectors(db, chat_id)
