from sqlalchemy.orm import Session
import uuid
from datetime import datetime, timedelta
from app.core.config import settings
from app.core.security import get_password_hash
from app import crud, schemas, models
from app.db import base  # noqa: F401

# Initial admin user
FIRST_ADMIN = {
    "email": "admin.deepq@deepq.io",
    "password": "tkototamopeva",
    "full_name": "DeepQ Admin",
    "is_superuser": True
}

# Sample users
INITIAL_USERS = [
    {
        "email": "analyst@deepq.io",
        "password": "demo123",
        "full_name": "John Analyst",
        "role": "analyst"
    },
    {
        "email": "manager@deepq.io",
        "password": "demo123",
        "full_name": "Sarah Manager",
        "role": "manager"
    }
]

# Sample notifications
INITIAL_NOTIFICATIONS = [
    {
        "title": "Welcome to DeepQ",
        "message": "Thank you for joining DeepQ. Get started by exploring our features.",
        "type": "info",
        "category": "system"
    },
    {
        "title": "Security Update",
        "message": "New security features have been implemented.",
        "type": "success",
        "category": "security"
    },
    {
        "title": "System Maintenance",
        "message": "Scheduled maintenance in 24 hours.",
        "type": "warning",
        "category": "system"
    }
]

# Sample analytics data
INITIAL_ANALYTICS = {
    "total_scans": 157892,
    "detection_rate": 99.7,
    "avg_confidence": 95.2,
    "processing_time": 142
}

async def init_db(db: Session) -> None:
    # Create admin user if it doesn't exist
    admin_user = await crud.user.get_by_email(db, email=FIRST_ADMIN["email"])
    if not admin_user:
        user_in = schemas.UserCreate(
            id=str(uuid.uuid4()),
            email=FIRST_ADMIN["email"],
            password=FIRST_ADMIN["password"],
            full_name=FIRST_ADMIN["full_name"],
            is_superuser=FIRST_ADMIN["is_superuser"],
            is_active=True,
            created_at=datetime.utcnow()
        )
        admin_user = await crud.user.create(db, obj_in=user_in)
        print(f"Created admin user: {admin_user.email}")

    # Create sample users
    for user_data in INITIAL_USERS:
        user = await crud.user.get_by_email(db, email=user_data["email"])
        if not user:
            user_in = schemas.UserCreate(
                id=str(uuid.uuid4()),
                email=user_data["email"],
                password=user_data["password"],
                full_name=user_data["full_name"],
                is_active=True,
                created_at=datetime.utcnow()
            )
            user = await crud.user.create(db, obj_in=user_in)
            print(f"Created user: {user.email}")

    # Create sample notifications
    for notif_data in INITIAL_NOTIFICATIONS:
        notification = models.Notification(
            id=str(uuid.uuid4()),
            title=notif_data["title"],
            message=notif_data["message"],
            type=notif_data["type"],
            category=notif_data["category"],
            timestamp=datetime.utcnow(),
            read=False
        )
        db.add(notification)
    
    # Create initial analytics record
    analytics = models.Analytics(
        id=str(uuid.uuid4()),
        total_scans=INITIAL_ANALYTICS["total_scans"],
        detection_rate=INITIAL_ANALYTICS["detection_rate"],
        avg_confidence=INITIAL_ANALYTICS["avg_confidence"],
        processing_time=INITIAL_ANALYTICS["processing_time"],
        timestamp=datetime.utcnow()
    )
    db.add(analytics)

    # Create default settings
    settings = models.Settings(
        id=str(uuid.uuid4()),
        allow_public_registration=True,
        require_email_verification=True,
        password_min_length=12,
        require_special_chars=True,
        require_numbers=True,
        require_uppercase=True,
        max_login_attempts=5,
        session_timeout=30
    )
    db.add(settings)

    await db.commit()
    print("Database initialized successfully!")
