from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db import Base

class EquipmentDetails(Base):
    __tablename__ = "equipment_details"

    equipment_id = Column(String(50), primary_key=True, index=True)
    equipment_name = Column(String(255), nullable=False)
    available_units = Column(Integer, nullable=False)

class ReservationRequest(Base):
    __tablename__ = "equipment_reservations"

    reservation_id = Column(Integer, primary_key=True, index=True)
    uid = Column(Integer, ForeignKey("users.uid_no"), nullable=False)
    equipment = Column(String(255), nullable=False)
    start_date = Column(String(255), nullable=False)
    end_date= Column(String(255), nullable=False)

    user = relationship("User", back_populates="reservations")

class User(Base):
    __tablename__ = "users"

    uid_no = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    phone_number = Column(String(15), nullable=False)
    email = Column(String(255), nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)

    reservations = relationship("ReservationRequest", back_populates="user")
