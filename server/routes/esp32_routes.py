# routes/esp32_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime
from db import get_db
from models import RFIDAttendance
from sqlalchemy import text

router = APIRouter()

class ESP32Data(BaseModel):
    block_data: str

@router.post("/esp32/data")
async def receive_esp32_data(data: ESP32Data, db: Session = Depends(get_db)):
    raw = data.block_data.strip()
    if raw == "":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty block_data")

    # If your DB stores UID as integer, you can try int conversion but fallback to string:
    try:
        uid_val = int(raw)
        q = RFIDAttendance.uid == uid_val
        print("Treating UID as integer:", uid_val)
    except ValueError:
        uid_val = raw
        q = RFIDAttendance.uid == uid_val
        print("Treating UID as string:", uid_val)

    attendance_record = db.query(RFIDAttendance).filter(q).first()
    if not attendance_record:
        raise HTTPException(status_code=404, detail="UID not found")

    current_timestamp = datetime.now()
    db.execute(text("INSERT INTO rfid_attendance (uid, timestamp) VALUES (:uid, :timestamp)"),
               {"uid": uid_val, "timestamp": current_timestamp})
    db.commit()
    return {"message": "Attendance logged successfully", "uid": uid_val, "timestamp": current_timestamp.isoformat()}
