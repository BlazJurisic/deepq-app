from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

class NotificationBase(BaseModel):
    """Base Notification Schema"""
    title: str
    message: str
    type: str = Field(..., description="info | success | warning | error")
    category: str = Field(..., description="user_management | system | security")
    data: Optional[Dict[str, Any]] = None

class NotificationCreate(NotificationBase):
    """Schema for creating a notification"""
    user_id: Optional[str] = None
    read: bool = False

class NotificationUpdate(BaseModel):
    """Schema for updating a notification"""
    title: Optional[str] = None
    message: Optional[str] = None
    type: Optional[str] = None
    category: Optional[str] = None
    read: Optional[bool] = None
    data: Optional[Dict[str, Any]] = None

class NotificationInDBBase(NotificationBase):
    """Base DB Schema for Notification"""
    id: str
    user_id: Optional[str]
    read: bool
    timestamp: datetime
    
    class Config:
        from_attributes = True

class Notification(NotificationInDBBase):
    """Schema for returning a notification"""
    pass

class NotificationInDB(NotificationInDBBase):
    """Schema for notification stored in DB"""
    pass

# Additional schemas for specific use cases
class NotificationBulkUpdate(BaseModel):
    """Schema for bulk updating notifications"""
    ids: list[str]
    read: bool

class NotificationFilter(BaseModel):
    """Schema for filtering notifications"""
    type: Optional[str] = None
    category: Optional[str] = None
    read: Optional[bool] = None
    from_date: Optional[datetime] = None
    to_date: Optional[datetime] = None

class NotificationCount(BaseModel):
    """Schema for notification counts"""
    total: int
    unread: int
    by_type: Dict[str, int]
    by_category: Dict[str, int]
