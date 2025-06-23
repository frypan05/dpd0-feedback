# app/models.py

from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Text, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base
import enum

class RoleEnum(str, enum.Enum):
    manager = "manager"
    employee = "employee"

class SentimentEnum(str, enum.Enum):
    positive = "positive"
    neutral = "neutral"
    negative = "negative"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(Enum(RoleEnum))
    manager_id = Column(Integer, ForeignKey("users.id"), nullable=True)

class Feedback(Base):
    __tablename__ = "feedback"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("users.id"))
    manager_id = Column(Integer, ForeignKey("users.id"))
    strengths = Column(Text)
    areas_to_improve = Column(Text)
    sentiment = Column(Enum(SentimentEnum))
    is_acknowledged = Column(Boolean, default=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
