from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import User,RFIDAttendance
from datetime import datetime, date

router = APIRouter()

@router.get("/profile/{username}")
def get_profile(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"name": user.name, "uid": user.uid}

# THIS IS WORKING IMPLMENTATION BAKI HAI

@router.get("/attendance/{uid}")
def get_attendance(uid: str, db: Session = Depends(get_db)):
    # Query the RFIDAttendance table for timestamps matching the UID
    attendance_records = db.query(RFIDAttendance).filter(RFIDAttendance.uid == uid).all()

    if not attendance_records:
        raise HTTPException(status_code=404, detail="No attendance records found for this UID")

    # Format the attendance records as a list of dates
    attendance_dates = [record.timestamp.date() for record in attendance_records]

    return {"uid": uid, "attendance_dates": attendance_dates}