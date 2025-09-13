from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime  # Correctly import datetime and date
from db import get_db
from models import ReservationRequest, User

router = APIRouter(
    prefix="/api",
    tags=["Reservations"]
)

# --- Pydantic Models ---
class ReservationCreate(BaseModel):
    username: str
    equipment: str
    start_date: datetime  # <-- CORRECTED: Changed from str to datetime
    end_date: datetime    # <-- CORRECTED: Changed from str to datetime

class StudentReservationDisplay(BaseModel):
    reservation_id: int
    equipment: str
    start_date: datetime  # <-- CORRECTED: Changed from date to datetime
    end_date: datetime    # <-- CORRECTED: Changed from date to datetime
    status: str

    class Config:
        from_attributes = True

class FacultyReservationDisplay(BaseModel):
    reservation_id: int
    equipment: str
    start_date: datetime  # <-- CORRECTED: Changed from date to datetime
    end_date: datetime    # <-- CORRECTED: Changed from date to datetime
    status: str
    student_name: str
    
    class Config:
        from_attributes = True

# --- API Endpoints ---

@router.post("/reservations", status_code=status.HTTP_201_CREATED)
def create_reservation(request: ReservationCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_reservation = ReservationRequest(
        uid=user.uid,
        equipment=request.equipment,
        start_date=request.start_date,
        end_date=request.end_date,
        status="Pending"
    )
    db.add(new_reservation)
    db.commit()
    db.refresh(new_reservation)
    return {"message": "Reservation request submitted successfully.", "reservation_id": new_reservation.reservation_id}


@router.get("/reservations/my-requests/{username}", response_model=List[StudentReservationDisplay])
def get_my_reservations(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    reservations = db.query(ReservationRequest).filter(ReservationRequest.uid == user.uid).all()
    return reservations


@router.get("/reservations/pending", response_model=List[FacultyReservationDisplay])
def get_pending_reservations(db: Session = Depends(get_db)):
    pending_requests = db.query(ReservationRequest).join(User).filter(ReservationRequest.status == 'Pending').all()
    
    response = []
    for req in pending_requests:
        response.append(FacultyReservationDisplay(
            reservation_id=req.reservation_id,
            equipment=req.equipment,
            start_date=req.start_date,
            end_date=req.end_date,
            status=req.status,
            student_name=req.user.name
        ))
    return response

@router.patch("/reservations/{reservation_id}/approve", status_code=status.HTTP_200_OK)
def approve_reservation(reservation_id: int, db: Session = Depends(get_db)):
    reservation = db.query(ReservationRequest).filter(ReservationRequest.reservation_id == reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    reservation.status = "Approved"
    db.commit()
    return {"message": "Reservation approved."}

@router.patch("/reservations/{reservation_id}/reject", status_code=status.HTTP_200_OK)
def reject_reservation(reservation_id: int, db: Session = Depends(get_db)):
    reservation = db.query(ReservationRequest).filter(ReservationRequest.reservation_id == reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    reservation.status = "Rejected"
    db.commit()
    return {"message": "Reservation rejected."}