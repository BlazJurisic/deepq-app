from typing import List
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.crud.base import CRUDBase
from app.models.analytics import Analytics
from app.schemas.analysis import AnalysisCreate, AnalysisUpdate

class CRUDAnalytics(CRUDBase[Analytics, AnalysisCreate, AnalysisUpdate]):
    async def get_recent_stats(
        self, 
        db: AsyncSession, 
        *, 
        days: int = 30
    ) -> List[Analytics]:
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        query = select(Analytics).filter(Analytics.timestamp >= cutoff_date)
        result = await db.execute(query)
        return result.scalars().all()

    async def get_average_metrics(self, db: AsyncSession) -> dict:
        query = select(
            func.avg(Analytics.detection_rate).label('avg_detection_rate'),
            func.avg(Analytics.avg_confidence).label('avg_confidence'),
            func.avg(Analytics.processing_time).label('avg_processing_time')
        )
        result = await db.execute(query)
        return dict(result.first())

analytics = CRUDAnalytics(Analytics)
