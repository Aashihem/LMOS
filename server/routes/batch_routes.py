# server/routes/batch_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from db import get_db
from models import LabBatch, User, Faculty, Experiment
from datetime import date # Correct import for date type

router = APIRouter(prefix="/api/batches", tags=["Batches"])

# --- Pydantic Models for API Responses and Requests ---

class BatchDisplay(BaseModel):
    id: int
    name: str
    lab_name: str
    class Config:
        from_attributes = True

class BatchCreate(BaseModel):
    name: str
    lab_name: str
    faculty_username: str
    student_usernames: List[str]

class ExperimentDisplay(BaseModel):
    id: int
    title: str
    description: str
    due_date: date  # Changed to date type to match models.py
    class Config:
        from_attributes = True

class ExperimentCreate(BaseModel):
    title: str
    description: str
    due_date: str # This should remain a string as the frontend sends it this way
    class Config:
        from_attributes = True # Added from_attributes for proper Pydantic behavior

class FacultyBatchDisplay(BaseModel):
    id: int
    name: str
    lab_name: str
    students_count: int
    # REMOVED: class Config: from_attributes = True (as previously corrected)

# --- API Endpoints ---
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_batch(batch_data: BatchCreate, db: Session = Depends(get_db)):
    """
    Creates a new lab batch and associates it with students and a faculty member.
    """
    faculty = db.query(Faculty).filter(Faculty.username == batch_data.faculty_username).first()
    if not faculty:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Faculty user not found"
        )

    new_batch = LabBatch(
        name=batch_data.name,
        lab_name=batch_data.lab_name,
        faculty=faculty
    )

    for username in batch_data.student_usernames:
        student = db.query(User).filter(User.username == username).first()
        if not student:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Student with username '{username}' not found."
            )
        new_batch.students.append(student)

    try:
        db.add(new_batch)
        db.commit()
        db.refresh(new_batch)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )

    return {"message": "Batch created successfully!"}

@router.get("/student/{username}", response_model=List[BatchDisplay])
def get_student_batches(username: str, db: Session = Depends(get_db)):
    """
    Retrieves all batches a specific student is enrolled in.
    """
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user.batches

@router.get("/faculty/{username}", response_model=List[FacultyBatchDisplay])
def get_faculty_batches(username: str, db: Session = Depends(get_db)):
    """
    Retrieves all batches managed by a specific faculty member.
    """
    faculty = db.query(Faculty).filter(Faculty.username == username).first()
    if not faculty:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Faculty not found"
        )

    batches_data = []
    for batch in faculty.batches:
        batches_data.append({
            "id": batch.id,
            "name": batch.name,
            "lab_name": batch.lab_name,
            "students_count": len(batch.students)
        })

    return batches_data

@router.post("/{batch_id}/experiments", status_code=status.HTTP_201_CREATED)
def create_experiment(batch_id: int, experiment_data: ExperimentCreate, db: Session = Depends(get_db)):
    """
    Creates a new experiment within a specific batch.
    """
    batch = db.query(LabBatch).filter(LabBatch.id == batch_id).first()
    if not batch:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Batch not found")
    
    new_experiment = Experiment(
        title=experiment_data.title,
        description=experiment_data.description,
        due_date=experiment_data.due_date,
        batch=batch
    )
    
    try:
        db.add(new_experiment)
        db.commit()
        db.refresh(new_experiment)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Database error: {str(e)}")
        
    return {"message": "Experiment created successfully!"}

@router.get("/{batch_id}/experiments", response_model=List[ExperimentDisplay])
def get_batch_experiments(batch_id: int, db: Session = Depends(get_db)):
    """
    Retrieves all experiments for a specific lab batch.
    """
    batch = db.query(LabBatch).filter(LabBatch.id == batch_id).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
        
    return batch.experiments