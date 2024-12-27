from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

class Msg(BaseModel):
    """Schema for messages"""
    msg: str