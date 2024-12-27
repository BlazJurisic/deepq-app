from sqlalchemy.ext.asyncio import AsyncSession
import uuid
from datetime import datetime, timezone
from app.core.security import get_password_hash
from app import crud, schemas, models

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


async def init_db(db: AsyncSession) -> None:
    try:
        # Create admin user if it doesn't exist
        admin_user = await crud.user.get_by_email(db, email=FIRST_ADMIN["email"])
        if not admin_user:
            user_in = schemas.User.UserCreate(
                id=str(uuid.uuid4()),
                email=FIRST_ADMIN["email"],
                password=FIRST_ADMIN["password"],
                full_name=FIRST_ADMIN["full_name"],
                is_superuser=FIRST_ADMIN["is_superuser"],
                is_active=True,
                created_at=datetime.now(timezone.utc),
            )
            admin_user = await crud.user.create(db, obj_in=user_in)
            print(f"Created admin user: {admin_user.email}")
            await create_user_notifications(db, admin_user)

        # Create sample users
        for user_data in INITIAL_USERS:
            user = await crud.user.get_by_email(db, email=user_data["email"])
            if not user:
                user_in = schemas.User.UserCreate(
                    id=str(uuid.uuid4()),
                    email=user_data["email"],
                    password=user_data["password"],
                    full_name=user_data["full_name"],
                    is_active=True,
                    created_at=datetime.now(timezone.utc),
                )
                user = await crud.user.create(db, obj_in=user_in)
                print(f"Created user: {user.email}")
                await create_user_notifications(db, user)

        # Create initial analytics record if it doesn't exist
        existing_analytics = await db.execute(
            models.Analytics.__table__.select().limit(1)
        )
        if not existing_analytics.first():
            analytics = models.Analytics(
                id=uuid.uuid4(),
                total_scans=INITIAL_ANALYTICS["total_scans"],
                detection_rate=INITIAL_ANALYTICS["detection_rate"],
                avg_confidence=INITIAL_ANALYTICS["avg_confidence"],
                processing_time=INITIAL_ANALYTICS["processing_time"],
                timestamp=datetime.now(timezone.utc),
            )
            db.add(analytics)

        # Create default settings if they don't exist
        existing_settings = await db.execute(
            models.Settings.__table__.select().limit(1)
        )
        if not existing_settings.first():
            settings = models.Settings(
                id=uuid.uuid4(),
                allow_public_registration=True,
                require_email_verification=True,
                password_min_length=12,
                require_special_chars=True,
                require_numbers=True,
                require_uppercase=True,
                max_login_attempts=5,
                session_timeout=30,
            )
            db.add(settings)

        # Commit changes
        await db.commit()
        print("Database initialized successfully!")

    except Exception as e:
        await db.rollback()
        print(f"An error occurred during database initialization: {e}")
        raise


async def create_user_notifications(db: AsyncSession, user: models.User) -> None:
    """
    Create initial notifications for a given user.
    """
    for notif_data in INITIAL_NOTIFICATIONS:
        notification = models.Notification(
            id=uuid.uuid4(),
            user_id=user.id,
            title=notif_data["title"],
            message=notif_data["message"],
            type=notif_data["type"],
            category=notif_data["category"],
            created_at=datetime.now(timezone.utc),
            read=False
        )
        db.add(notification)
    print(f"Initial notifications created for user: {user.email}")
