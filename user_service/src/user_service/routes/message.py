from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from user_service.config.database import get_db
from user_service.schemas import MessageResponse, MessageCreate, MessageCreate
from user_service.services.message import create_message, list_messages
from user_service.utils.jwt import get_current_user_id
from user_service.services.langgraph import graph
from langchain_core.messages import HumanMessage, SystemMessage
from user_service.services.chat_connector import list_chat_connectors
from user_service.utils.prompt import get_rag_prompt

router = APIRouter(
    prefix="/message",
    tags=["message"],
)


@router.get("/{chat_id}", response_model=list[MessageResponse])
def list_messages_route(
    chat_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    return list_messages(db, chat_id)


@router.post(
    "/",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_message_route(
    message_data: MessageCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    create_message(
        db,
        message_data,
    )
    chat_connectors = list_chat_connectors(db, message_data.chat_id)
    file_ids = [
        connector.connector_id
        for connector in chat_connectors
        if connector.connector_id
    ]
    connectors = [
        connector.connector for connector in chat_connectors if connector.connector
    ]
    rag_prompt = get_rag_prompt(connectors)
    result = graph.invoke(
        {
            "messages": [
                SystemMessage(content=rag_prompt),
                HumanMessage(content=message_data.content),
            ],
            "file_ids": file_ids,
        }
    )

    content = result["messages"][-1].content
    ai_response = "No response"
    try:
        ai_response = "".join(
            block["text"] for block in content if block.get("type") == "text"
        )
    except:
        ai_response = content

    message_create = MessageCreate(
        content=ai_response.strip(),
        type="text",
        role="ai",
        chat_id=message_data.chat_id,
    )
    message = create_message(
        db,
        message_create,
    )
    return message
