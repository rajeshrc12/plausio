from pydantic import BaseModel, ConfigDict


class CeleryCreate(BaseModel):
    id: int
    type: str


class CeleryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    type: str
