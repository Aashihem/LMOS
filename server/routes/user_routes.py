from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from db import get_db
from models import User

router = APIRouter(prefix="/api/users", tags=["Users"])

class UserDisplay(BaseModel):
    uid: int
    name: str
    username: str

    class Config:
        from_attributes = True

@router.get("/students", response_model=List[UserDisplay])
def get_all_students(db: Session = Depends(get_db)):
    students = db.query(User).all()
    if not students:
        raise HTTPException(status_code=404, detail="No students found")
    return students