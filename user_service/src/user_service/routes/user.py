from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from user_service.config.database import get_db
from user_service.schemas import UserCreate, UserResponse
from user_service.services.user import get_user, create_user

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get("/{user_id}", response_model=UserResponse)
def get_user_route(
    user_id: int,
    db: Session = Depends(get_db),
):
    return get_user(db, user_id)


@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_user_route(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    return create_user(db, user_data)
