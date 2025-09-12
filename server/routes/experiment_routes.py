from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import date
from db import get_db
from models import Experiment, Submission, User

router = APIRouter(
    prefix="/api/experiments",
    tags=["Experiments"]
)

# --- Pydantic Models ---
class ExperimentCreate(BaseModel):
    title: str
    description: Optional[str] = None
    lab: str
    batch: str
    due_date: date

class ExperimentDisplay(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    lab: str
    batch: str
    due_date: date
    status: str

    class Config:
        from_attributes = True
        
class SubmissionDisplay(BaseModel):
    id: int
    submitted_at: date
    student_name: str
    grade: Optional[str] = None

    class Config:
        from_attributes = True

# --- API Endpoints ---

# POST /api/experiments - For faculty to create a new experiment
@router.post("/", response_model=ExperimentDisplay, status_code=status.HTTP_201_CREATED)
def create_experiment(request: ExperimentCreate, db: Session = Depends(get_db)):
    new_experiment = Experiment(**request.dict())
    db.add(new_experiment)
    db.commit()
    db.refresh(new_experiment)
    return new_experiment

# GET /api/experiments - For both students and faculty to get a list of all experiments
@router.get("/", response_model=List[ExperimentDisplay])
def get_all_experiments(db: Session = Depends(get_db)):
    experiments = db.query(Experiment).order_by(Experiment.due_date.desc()).all()
    return experiments
    
# GET /api/experiments/{experiment_id}/submissions - For faculty to view submissions for an experiment
@router.get("/{experiment_id}/submissions", response_model=List[SubmissionDisplay])
def get_submissions_for_experiment(experiment_id: int, db: Session = Depends(get_db)):
    submissions = db.query(Submission).join(User).filter(Submission.experiment_id == experiment_id).all()
    
    # Format the response to include the student's name
    response = []
    for sub in submissions:
        response.append(SubmissionDisplay(
            id=sub.id,
            submitted_at=sub.submitted_at,
            student_name=sub.student.name,
            grade=sub.grade
        ))
    return response
