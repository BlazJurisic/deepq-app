from typing import Optional, Any
from pydantic import BaseModel
from datetime import datetime

class NotificationBase(BaseModel):
    title: str
    message: str
    type: str
    data: Optional[dict] = None

class NotificationCreate(NotificationBase):
    user_id: str

class Notification(NotificationBase):
    id: str
    read: bool
    created_at: datetime

    class Config:
        from_attributes = True
