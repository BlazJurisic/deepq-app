from sqlalchemy import Column, String, Boolean, Integer
from app.db.base_class import Base

class Settings(Base):
    id = Column(String, primary_key=True)
    allow_public_registration = Column(Boolean, default=True)
    require_email_verification = Column(Boolean, default=True)
    password_min_length = Column(Integer, default=12)
    require_special_chars = Column(Boolean, default=True)
    require_numbers = Column(Boolean, default=True)
    require_uppercase = Column(Boolean, default=True)
    max_login_attempts = Column(Integer, default=5)
    session_timeout = Column(Integer, default=30)
