from pydantic import BaseModel
from typing import Optional
from enum import Enum
from datetime import datetime

class SentimentEnum(str, Enum):
    positive = "positive"
    neutral = "neutral"
    negative = "negative"

class FeedbackBase(BaseModel):
    strengths: str
    areas_to_improve: str
    sentiment: SentimentEnum

class FeedbackCreate(FeedbackBase):
    employee_id: int

class FeedbackResponse(FeedbackBase):
    id: int
    manager_id: int
    employee_id: int
    is_acknowledged: bool
    timestamp: datetime

    class Config:
        orm_mode = True
