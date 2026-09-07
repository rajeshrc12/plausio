from datetime import datetime

from pydantic import BaseModel, ConfigDict
from user_service.schemas.connector import ConnectorResponse


class ChatConnectorBase(BaseModel):
    chat_id: int
    connector_id: int


class ChatConnectorCreate(BaseModel):
    chat_id: int
    connector_ids: list[int]


class ChatConnectorResponse(BaseModel):
    chat_id: int
    connector_id: int
    created_at: datetime
    updated_at: datetime
    connector: ConnectorResponse

    model_config = ConfigDict(from_attributes=True)
