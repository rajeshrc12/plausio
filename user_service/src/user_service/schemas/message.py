from pydantic import BaseModel, ConfigDict


class MessageCreate(BaseModel):
    content: str
    type: str
    role: str
    chat_id: int


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    content: str
    type: str
    role: str
