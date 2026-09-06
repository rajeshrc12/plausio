from pydantic import BaseModel, ConfigDict


class ChatCreate(BaseModel):
    title: str


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
