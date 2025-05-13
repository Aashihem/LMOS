from sqlalchemy import Column, Integer, String
from db import Base

class User(Base):
    __tablename__ = "users"

    uid_no = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    phone_number = Column(String(15), nullable=False)
    email = Column(String(255), nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)