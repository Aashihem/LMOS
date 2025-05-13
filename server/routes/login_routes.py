from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import User
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for login request
class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # Query the database for the user
    user = db.query(User).filter(User.username == request.username).first()
    if not user or user.password != request.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"message": "Login successful", "user": {"username": user.username, "email": user.email}}