from sqlalchemy import Column, String, DateTime, Boolean, JSON, ForeignKey, text
from sqlalchemy.sql import func
from app.db.base_class import Base
from sqlalchemy.dialects.postgresql import UUID

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()")
    )     
    user_id = Column(String, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    category = Column(String, nullable=False)  # user_management, system, security
    type = Column(String, nullable=False)  # info, success, warning, error
    read = Column(Boolean, default=False)
    data = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
