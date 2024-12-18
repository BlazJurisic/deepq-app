from sqlalchemy import Column, String, Float, DateTime, Integer
from sqlalchemy.sql import func
from app.db.base_class import Base

class Analytics(Base):
    id = Column(String, primary_key=True)
    total_scans = Column(Integer)
    detection_rate = Column(Float)
    avg_confidence = Column(Float)
    processing_time = Column(Integer)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
