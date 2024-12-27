from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.crud.base import CRUDBase
from app.models.settings import Settings
from app.schemas.settings import SettingsCreate, SettingsUpdate

class CRUDSettings(CRUDBase[Settings, SettingsCreate, SettingsUpdate]):
    async def get_current(self, db: AsyncSession) -> Optional[Settings]:
        """Get the current active settings"""
        query = select(Settings).order_by(Settings.id.desc())
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def update_settings(
        self, 
        db: AsyncSession, 
        *, 
        settings_in: SettingsUpdate
    ) -> Settings:
        current_settings = await self.get_current(db)
        if not current_settings:
            # Create new settings if none exist
            return await self.create(db, obj_in=settings_in)
        return await self.update(db, db_obj=current_settings, obj_in=settings_in)

settings = CRUDSettings(Settings)
