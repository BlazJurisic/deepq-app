from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

class EmailStr(BaseModel):
    """Schema for email string"""
    msg: str