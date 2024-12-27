from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.crud.base import CRUDBase
from app.models.notification import Notification
from app.schemas.notification import NotificationCreate, NotificationUpdate

class CRUDNotification(CRUDBase[Notification, NotificationCreate, NotificationUpdate]):
    async def get_unread(self, db: AsyncSession) -> List[Notification]:
        query = select(Notification).filter(Notification.read == False)
        result = await db.execute(query)
        return result.scalars().all()

    async def mark_as_read(self, db: AsyncSession, *, notification_id: str) -> Notification:
        notification = await self.get(db, id=notification_id)
        if notification:
            notification.read = True
            await db.commit()
            await db.refresh(notification)
        return notification

    async def get_by_user(self, db: AsyncSession, *, user_id: str) -> List[Notification]:
        query = select(Notification).filter(Notification.user_id == user_id)
        result = await db.execute(query)
        return result.scalars().all()

notification = CRUDNotification(Notification)
