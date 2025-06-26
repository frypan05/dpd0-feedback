from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth.dependencies import get_current_user
from app.models import Feedback, User
from app.schemas import FeedbackCreate, FeedbackResponse
from fastapi import Path

router = APIRouter()

@router.post("/feedback", response_model=FeedbackResponse)
def submit_feedback(
    feedback: FeedbackCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Only managers can give feedback")
    
    emp = db.query(User).filter(User.id == feedback.employee_id).first()
    if not emp or emp.manager_id != current_user.id:
        raise HTTPException(status_code=404, detail="Employee not found or unauthorized")

    new_feedback = Feedback(
        employee_id=feedback.employee_id,
        manager_id=current_user.id,
        strengths=feedback.strengths,
        areas_to_improve=feedback.areas_to_improve,
        sentiment=feedback.sentiment
    )
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)
    return new_feedback

@router.get("/feedback")
def get_all_feedback(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Only managers can access this.")

    feedbacks = db.query(Feedback).all()
    return feedbacks

@router.get("/feedback/me", response_model=list[FeedbackResponse])
def get_my_feedback(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "employee":
        raise HTTPException(status_code=403, detail="Only employees can view their feedback")

    feedbacks = db.query(Feedback).filter(Feedback.employee_id == current_user.id).all()
    return feedbacks

@router.get("/feedback/{employee_id}", response_model=list[FeedbackResponse])
def get_employee_feedbacks(employee_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Only managers can view this")

    emp = db.query(User).filter(User.id == employee_id, User.manager_id == current_user.id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Unauthorized")

    feedbacks = db.query(Feedback).filter(Feedback.employee_id == employee_id).all()
    return feedbacks

@router.post("/feedback/{feedback_id}/acknowledge")
def acknowledge_feedback(
    feedback_id: int = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    feedback = db.query(Feedback).filter(
        Feedback.id == feedback_id,
        Feedback.employee_id == current_user.id
    ).first()

    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found or unauthorized")

    if feedback.is_acknowledged:
        return {"message": "Already acknowledged"}

    feedback.is_acknowledged = True
    db.commit()

    return {"message": "Acknowledged successfully"}


