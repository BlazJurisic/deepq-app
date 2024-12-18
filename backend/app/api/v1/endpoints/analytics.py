from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, models
from app.api import deps

router = APIRouter()

@router.get("/overview")
async def get_overview(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get analytics overview.
    """
    return {
        "totalScans": 157892,
        "detectionRate": 99.7,
        "avgConfidence": 95.2,
        "processingTime": 142,
        "userStats": {
            "total": 256,
            "active": 198,
            "newThisMonth": 45
        },
        "detectionBreakdown": [
            {
                "category": "Voice Deepfake",
                "count": 1245,
                "percentage": 45
            },
            {
                "category": "Audio Manipulation",
                "count": 856,
                "percentage": 31
            },
            {
                "category": "Synthetic Speech",
                "count": 412,
                "percentage": 15
            }
        ],
        "modelPerformance": [
            {
                "model": "DeepDetect v2",
                "accuracy": 99.7,
                "speed": 142,
                "load": 45
            },
            {
                "model": "VoiceGuard",
                "accuracy": 98.2,
                "speed": 156,
                "load": 38
            }
        ]
    }
