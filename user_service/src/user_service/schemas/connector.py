from pydantic import BaseModel, ConfigDict


class ConnectorCreate(BaseModel):
    name: str
    title: str
    description: str
    type: str


class ConnectorResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    title: str
    description: str
    type: str
    status: str


class ConnectorUploadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    title: str
    description: str
    type: str
    status: str
    url: str
    key: str
