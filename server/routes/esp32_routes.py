from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime
from db import get_db
from models import Attendance  # Import your Attendance model

router = APIRouter()

# Define a Pydantic model for the data sent by the ESP32
class ESP32Data(BaseModel):
    block_data: str 

@router.post("/esp32/data")
async def receive_esp32_data(data: ESP32Data, db: Session = Depends(get_db)):
    block_data = data.block_data  # Extract the block_data from the request
    print(f"Received data from ESP32: {block_data}")

    # Check if the UID exists in the attendance table
    attendance_record = db.query(Attendance).filter(Attendance.uid == block_data).first()
    if not attendance_record:
        raise HTTPException(status_code=404, detail="UID not found in attendance table")

    # Get the current date
    current_date = datetime.now().strftime("%Y-%m-%d")

    # Check if the column for the current date exists
    if not hasattr(Attendance, current_date):
        # Dynamically add a new column for the current date
        from sqlalchemy import Column, DateTime
        from sqlalchemy import inspect

        inspector = inspect(db.get_bind())
        if current_date not in [col["name"] for col in inspector.get_columns("attendance")]:
            # Add the column to the table
            from sqlalchemy import text
            db.execute(text(f"ALTER TABLE attendance ADD COLUMN `{current_date}` DATETIME"))
            db.commit()

    # Update the timestamp for the matching UID
    setattr(attendance_record, current_date, datetime.now())
    db.commit()

    return {"message": "Attendance updated successfully", "uid": block_data, "timestamp": datetime.now()}