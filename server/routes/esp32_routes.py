from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime
from db import get_db
from models import RFIDAttendance  # Update to match your model name

router = APIRouter()

# Define a Pydantic model for the data sent by the ESP32
class ESP32Data(BaseModel):
    block_data: str 

@router.post("/esp32/data")
async def receive_esp32_data(data: ESP32Data, db: Session = Depends(get_db)):
    block_data = data.block_data
    block_data= int(block_data)  # Extract the block_data from the request
    print(f"Received data from ESP32: {block_data}")
    attendance_record=0
    print("att",attendance_record)

    # Check if the UID exists
    #  in the rfid_attendance table
    attendance_record = db.query(RFIDAttendance).filter(RFIDAttendance.uid == block_data).first()

    print("att",attendance_record)
    if not attendance_record:
        raise HTTPException(status_code=404, detail="UID not found in rfid_attendance table")

    print("HERE")
    # Log the attendance as a new row with a timestamp
    from sqlalchemy import text
    current_timestamp = datetime.now()
    db.execute(
        text("INSERT INTO rfid_attendance (uid, timestamp) VALUES (:uid, :timestamp)"),
        {"uid": block_data, "timestamp": current_timestamp}
    )
    db.commit()

    return {"message": "Attendance logged successfully", "uid": block_data, "timestamp": current_timestamp}