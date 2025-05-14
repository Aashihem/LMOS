# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from db import get_db
# from models import ReservationRequest
# @router.get("/reservations/{uid}")
# def get_reservations(uid: int, db: Session = Depends(get_db)):
#     reservations = db.query(ReservationRequest).filter(ReservationRequest.uid == uid).all()
#     return [
#         {
#             "reservation_id": res.reservation_id,
#             "equipment": res.equipment,
#             "start_date": res.start_date,
#             "end_date": res.end_date,
#         }
#         for res in reservations
#     ]