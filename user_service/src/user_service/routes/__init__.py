from user_service.routes.user import router as user_router
from user_service.routes.auth import router as auth_router

__all__ = ["user_router", "auth_router"]
