from user_service.routes.user import router as user_router
from user_service.routes.auth import router as auth_router
from user_service.routes.connector import router as connector_router
from user_service.routes.chat import router as chat_router
from user_service.routes.message import router as message_router
from user_service.routes.chat_connector import router as chat_connector_router

__all__ = [
    "user_router",
    "auth_router",
    "connector_router",
    "chat_router",
    "message_router",
    "chat_connector_router",
]
