from sqlalchemy import Column, String, DateTime, Boolean, JSON, ForeignKey
from sqlalchemy.sql import func
from app.db.base_class import Base

class Notification(Base):
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("user.id"))
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    type = Column(String, nullable=False)  # info, success, warning, error
    read = Column(Boolean, default=False)
    data = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
