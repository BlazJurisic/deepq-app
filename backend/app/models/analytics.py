from sqlalchemy import Column, String, Float, DateTime, Integer, text
from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.sql import func
from app.db.base_class import Base

class Analytics(Base):
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),  # or 'uuid_generate_v4()' if using the uuid-ossp extension
    )
    total_scans = Column(Integer)
    detection_rate = Column(Float)
    avg_confidence = Column(Float)
    processing_time = Column(Integer)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
