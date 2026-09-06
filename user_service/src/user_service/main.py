from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from user_service.config.qdrant import init_qdrant

from user_service.routes import (
    user_router,
    auth_router,
    connector_router,
    celery_router,
    chat_router,
    message_router,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_qdrant()
    yield


app = FastAPI(
    title="Task API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(connector_router)
app.include_router(celery_router)
app.include_router(chat_router)
app.include_router(message_router)


@app.get("/")
def root():
    return {"message": "User API is running"}
