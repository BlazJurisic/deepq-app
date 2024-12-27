from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

class ChunkResult(BaseModel):
    """Schema for individual chunk analysis results"""
    chunk: int
    predicted_classes: List[str]
    confidence_scores: List[float]

class AnalysisResult(BaseModel):
    """Schema for the complete analysis result"""
    final_decision: str
    chunk_results: List[ChunkResult]

class AnalysisBase(BaseModel):
    """Base Analysis Schema"""
    type: str = Field(..., description="file | youtube")
    result: AnalysisResult
    source_info: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None

class AnalysisCreate(AnalysisBase):
    """Schema for creating an analysis record"""
    user_id: str
    processed_at: datetime = Field(default_factory=datetime.utcnow)

class AnalysisUpdate(BaseModel):
    """Schema for updating an analysis record"""
    result: Optional[AnalysisResult] = None
    source_info: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None
    status: Optional[str] = Field(None, description="pending | completed | failed")
    error_message: Optional[str] = None
    processing_time: Optional[float] = None
    confidence_score: Optional[float] = None

class AnalysisInDBBase(AnalysisBase):
    """Base DB Schema for Analysis"""
    id: str
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    status: str = Field(..., description="pending | completed | failed")
    processing_time: Optional[float] = None
    confidence_score: Optional[float] = None
    error_message: Optional[str] = None

    class Config:
        from_attributes = True

class Analysis(AnalysisInDBBase):
    """Schema for returning an analysis"""
    pass

class AnalysisInDB(AnalysisInDBBase):
    """Schema for analysis stored in DB"""
    pass

# Additional schemas for specific use cases
class AnalysisFilter(BaseModel):
    """Schema for filtering analyses"""
    user_id: Optional[str] = None
    type: Optional[str] = None
    status: Optional[str] = None
    from_date: Optional[datetime] = None
    to_date: Optional[datetime] = None
    min_confidence: Optional[float] = None

class AnalysisStats(BaseModel):
    """Schema for analysis statistics"""
    total_analyses: int
    average_confidence: float
    average_processing_time: float
    by_type: Dict[str, int]
    by_status: Dict[str, int]
    detection_rates: Dict[str, float]

class BatchAnalysisRequest(BaseModel):
    """Schema for batch analysis requests"""
    files: List[str]
    type: str = Field(..., description="file | youtube")
    priority: Optional[str] = Field("normal", description="low | normal | high")
    callback_url: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

class AnalysisResponse(BaseModel):
    """Schema for analysis API response"""
    analysis_id: str
    status: str
    result: Optional[AnalysisResult] = None
    error_message: Optional[str] = None
    processing_time: Optional[float] = None
    created_at: datetime
    metadata: Optional[Dict[str, Any]] = None
