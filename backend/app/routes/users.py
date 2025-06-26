# app/routes/users.py
 
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user, get_db
from app.models import User

router = APIRouter()

@router.get("/users")
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/me")
def get_my_profile(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role
    }

@router.get("/team")
def get_team(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "manager":
        return {"error": "Only managers can access their team"}
    
    team = db.query(User).filter(User.manager_id == current_user.id).all()
    return [{"id": emp.id, "email": emp.email} for emp in team]
