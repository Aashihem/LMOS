from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from datetime import datetime
from db import get_db
from models import RFIDAttendance, User

router = APIRouter(
    prefix="/api/attendance",
    tags=["Attendance"]
)

# Pydantic model for displaying attendance records
class AttendanceRecord(BaseModel):
    timestamp: datetime
    student_name: str
    uid_no: str

    class Config:
        from_attributes = True # Updated from orm_mode

# Endpoint for faculty to get the last attendance record for ALL students
@router.get("/last-activity")
def get_last_activity_for_all_students(db: Session = Depends(get_db)):
    latest_attendance = db.query(
        User.username,
        User.name,
        User.uid_no,
        db.func.max(RFIDAttendance.timestamp).label('last_seen')
    ).join(RFIDAttendance, User.uid_no == RFIDAttendance.uid).group_by(User.uid).all()
    
    return latest_attendance

# Endpoint for a single student to get their own attendance history
@router.get("/{username}")
def get_student_attendance(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    attendance_records = db.query(RFIDAttendance).filter(RFIDAttendance.uid == user.uid_no).order_by(RFIDAttendance.timestamp.desc()).all()
    return attendance_records

