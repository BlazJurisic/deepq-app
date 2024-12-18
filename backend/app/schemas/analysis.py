from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class ChunkResult(BaseModel):
    chunk: int
    predicted_classes: List[str]
    confidence_scores: List[float]

class AnalysisResult(BaseModel):
    final_decision: str
    chunk_results: List[ChunkResult]

class AnalysisCreate(BaseModel):
    type: str
    result: AnalysisResult
    source_info: Optional[dict] = None

class Analysis(AnalysisCreate):
    id: str
    user_id: str
    created_at: datetime

    class Config:
        from_attributes = True
