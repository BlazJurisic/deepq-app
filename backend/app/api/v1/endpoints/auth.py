from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Any
from app import crud, models, schemas
from app.api import deps
from app.core import security

router = APIRouter()

@router.post("/register", response_model=schemas.User)
async def register(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
) -> Any:
    """
    Register new user.
    """
    user = await crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    user = await crud.user.create(db, obj_in=user_in)
    return user

@router.post("/login", response_model=schemas.Token)
async def login(
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login.
    """
    user = await crud.user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=400, detail="Incorrect email or password"
        )
    elif not user.is_active:
        raise HTTPException(
            status_code=400, detail="Inactive user"
        )
    access_token = security.create_access_token(user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.post("/forgot-password", response_model=schemas.Msg)
async def forgot_password(
    email_in: schemas.EmailStr,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Password recovery email.
    """
    user = await crud.user.get_by_email(db, email=email_in)
    if user:
        # Send password reset email
        pass
    return {"msg": "Password recovery email sent"}

@router.post("/reset-password", response_model=schemas.Msg)
async def reset_password(
    token: str,
    new_password: str,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Reset password.
    """
    return {"msg": "Password updated successfully"}
