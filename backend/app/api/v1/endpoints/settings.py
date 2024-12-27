from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.get("/admin")
async def get_admin_settings(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> schemas.Settings.AdminSettings:
    """
    Get admin settings.
    """
    settings = await crud.settings.get_current(db)
    if not settings:
        # Return default settings if none exist
        return schemas.Settings.AdminSettings()
    return schemas.Settings.AdminSettings(
        user_management=schemas.UserManagementConfig(
            allow_public_registration=settings.allow_public_registration,
            require_email_verification=settings.require_email_verification,
            password_policy=schemas.PasswordPolicy(
                min_length=settings.password_min_length,
                require_special_chars=settings.require_special_chars,
                require_numbers=settings.require_numbers,
                require_uppercase=settings.require_uppercase
            ),
            default_user_role="user",
            auto_send_credentials=True
        ),
        security=schemas.Settings.SecurityConfig(
            max_login_attempts=settings.max_login_attempts,
            session_timeout=settings.session_timeout,
            ip_whitelist=[]
        )
    )

@router.put("/admin")
async def update_admin_settings(
    *,
    db: Session = Depends(deps.get_db),
    settings_in: schemas.Settings.AdminSettings,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> schemas.Settings.AdminSettingsResponse:
    """
    Update admin settings.
    """
    try:
        settings_update = schemas.Settings.SettingsUpdate(
            user_management=settings_in.user_management,
            security=settings_in.security
        )
        await crud.settings.update_settings(db, settings_in=settings_update)
        return schemas.Settings.AdminSettingsResponse(
            success=True,
            message="Settings updated successfully",
            settings=settings_in
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to update settings: {str(e)}"
        )
