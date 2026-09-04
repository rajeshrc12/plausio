from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from user_service.models import User
from user_service.schemas import UserCreate


def get_user(db: Session, user_id: int):
    user = db.get(User, user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user


def create_user(db: Session, user_data: UserCreate):
    user = User(
        name=user_data.name,
        email=user_data.email,
        profile_url=user_data.profile_url,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user
