# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from db import get_db
# from models import EquipmentDetails

# router = APIRouter()

# @router.get("/equipment")
# def get_equipment(db: Session = Depends(get_db)):
#     equipment = db.query(EquipmentDetails).all()
#     return [{"equipment_id": eq.equipment_id, "equipment_name": eq.equipment_name, "available_units": eq.available_units} for eq in equipment]