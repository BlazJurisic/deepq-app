from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.get("/admin", response_model=List[schemas.Notification.Notification])
async def get_admin_notifications(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Get admin notifications.
    """
    return [
        {
            "id": "1",
            "title": "New User Registration",
            "message": "A new user has registered and requires approval",
            "type": "info",
            "timestamp": "2024-03-21T10:30:00Z",
            "read": False,
            "category": "user_management",
            "user_id": "1"
        },
        {
            "id": "2",
            "title": "System Update",
            "message": "New system update available",
            "type": "warning",
            "timestamp": "2024-03-21T09:15:00Z",
            "read": True,
            "category": "system",
            "user_id": "1"

        }
    ]
