from fastapi import APIRouter, Depends
from pydantic import BaseModel  # <-- ADD THIS IMPORT
from sqlalchemy.orm import Session
from typing import List
from db import get_db
from models import EquipmentDetails

router = APIRouter(
    prefix="/api",
    tags=["Equipment"]
)

# Pydantic model for what the frontend expects
class EquipmentDisplay(BaseModel):
    id: str
    name: str
    type: str
    availability: str

    # This config is needed if you are creating a Pydantic model from an ORM model
    class Config:
        from_attributes = True


# This is the endpoint your frontend is trying to call
@router.get("/equipment", response_model=List[EquipmentDisplay])
def get_all_equipment(db: Session = Depends(get_db)):
    """
    Fetches all equipment from the equipment_details table
    that have at least one available unit.
    """
    equipment_list = db.query(EquipmentDetails).filter(EquipmentDetails.available_units > 0).all()

    # Format the data to match exactly what the frontend component needs
    response = []
    for item in equipment_list:
        response.append(EquipmentDisplay(
            id=item.equipment_id,
            name=item.equipment_name,
            # A simple way to get the 'type' from the name
            type=item.equipment_name.split(' ')[0],
            availability="Available"
        ))
    return response

