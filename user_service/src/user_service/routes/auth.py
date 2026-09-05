from fastapi import APIRouter, HTTPException, Depends, Response
from sqlalchemy.orm import Session
from user_service.config.database import get_db
from user_service.schemas import UserCreate
from user_service.models import User
from user_service.services.user import create_user
from user_service.utils.jwt import create_access_token
from user_service.config.settings import settings

from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


class GoogleLogin(BaseModel):
    credential: str


@router.post("/google")
def google_login(
    data: GoogleLogin,
    response: Response,
    db: Session = Depends(get_db),
):
    try:
        info = id_token.verify_oauth2_token(
            data.credential,
            requests.Request(),
            settings.google_client_id,
        )
    except ValueError:
        raise HTTPException(
            status_code=401,
            detail="Invalid Google token",
        )

    email = info.get("email")
    name = info.get("name") or ""
    picture = info.get("picture") or ""

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Google account email not found",
        )

    user = db.query(User).filter(User.email == email).first()

    if not user:
        user_data = UserCreate(
            name=name,
            email=email,
            profile_url=picture,
        )

        user = create_user(db, user_data)

    token = create_access_token(user.id)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=settings.jwt_expire_minutes * 60,
    )

    return {"message": "Login successful"}
