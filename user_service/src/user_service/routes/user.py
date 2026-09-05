from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from user_service.config.database import get_db
from user_service.schemas import UserResponse
from user_service.services.user import get_user
from user_service.utils.jwt import get_current_user_id

router = APIRouter(
    prefix="/user",
    tags=["user"],
)


@router.get("/me", response_model=UserResponse)
def get_user_route(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    return get_user(db, user_id)
