# server/routes/equipment_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from db import get_db
from models import EquipmentDetails # Import the EquipmentDetails model

router = APIRouter(prefix="/api/equipment", tags=["Equipment"])

# Pydantic model for creating new equipment (matches ORM model)
class EquipmentCreate(BaseModel):
    equipment_id: str
    equipment_name: str
    available_units: int

# Pydantic model for displaying equipment (matches ORM model)
class EquipmentDisplay(BaseModel):
    equipment_id: str
    equipment_name: str
    available_units: int
    class Config:
        from_attributes = True

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_equipment(request: EquipmentCreate, db: Session = Depends(get_db)):
    """
    Allows a faculty member to add new equipment.
    """
    new_equipment = EquipmentDetails(
        equipment_id=request.equipment_id,
        equipment_name=request.equipment_name,
        available_units=request.available_units
    )
    db.add(new_equipment)
    db.commit()
    db.refresh(new_equipment)
    return {"message": "Equipment added successfully!", "equipment": new_equipment}

@router.get("/", response_model=List[EquipmentDisplay])
def get_all_equipment(db: Session = Depends(get_db)):
    """
    Retrieves a list of all available equipment.
    """
    equipment = db.query(EquipmentDetails).all()
    if not equipment:
        raise HTTPException(status_code=404, detail="No equipment found")
    return equipment