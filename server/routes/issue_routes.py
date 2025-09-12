from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from db import get_db
from models import EquipmentIssue, User

router = APIRouter(
    prefix="/api",
    tags=["Issues"]
)

# Pydantic model for creating a new issue
class IssueCreate(BaseModel):
    title: str
    description: str
    lab: str
    equipment: str
    reported_by_username: str

# Pydantic model for displaying an issue
class IssueDisplay(BaseModel):
    issue_id: int
    title: str
    description: str
    lab: str
    equipment: str
    status: str
    priority: str
    reported_by_username: str

    class Config:
        orm_mode = True

# Endpoint for students to report a new issue
@router.post("/issues", status_code=status.HTTP_201_CREATED)
def report_new_issue(request: IssueCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.reported_by_username).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"User '{request.reported_by_username}' not found.")

    new_issue = EquipmentIssue(
        title=request.title,
        description=request.description,
        lab=request.lab,
        equipment=request.equipment,
        uid=user.uid
    )
    db.add(new_issue)
    db.commit()
    db.refresh(new_issue)
    return {"message": "Issue reported successfully", "issue_id": new_issue.issue_id}

# Endpoint for faculty to get a list of all open issues
@router.get("/issues", response_model=List[IssueDisplay])
def get_open_issues(db: Session = Depends(get_db)):
    issues = db.query(EquipmentIssue).join(User).order_by(EquipmentIssue.issue_id.desc()).all()
    
    response = []
    for issue in issues:
        response.append(IssueDisplay(
            issue_id=issue.issue_id,
            title=issue.title,
            description=issue.description,
            lab=issue.lab,
            equipment=issue.equipment,
            status=issue.status,
            priority=issue.priority,
            reported_by_username=issue.reporter.username
        ))
    return response

# --- NEW ENDPOINT TO RESOLVE AN ISSUE ---
@router.patch("/issues/{issue_id}/resolve", status_code=status.HTTP_200_OK)
def resolve_issue(issue_id: int, db: Session = Depends(get_db)):
    issue = db.query(EquipmentIssue).filter(EquipmentIssue.issue_id == issue_id).first()
    if not issue:
        raise HTTPException(status_code=404, detail=f"Issue with id {issue_id} not found.")
    
    issue.status = "Resolved"
    db.commit()
    return {"message": f"Issue {issue_id} has been marked as Resolved."}

# --- NEW ENDPOINT TO ESCALATE AN ISSUE ---
@router.patch("/issues/{issue_id}/escalate", status_code=status.HTTP_200_OK)
def escalate_issue(issue_id: int, db: Session = Depends(get_db)):
    issue = db.query(EquipmentIssue).filter(EquipmentIssue.issue_id == issue_id).first()
    if not issue:
        raise HTTPException(status_code=404, detail=f"Issue with id {issue_id} not found.")
        
    issue.priority = "Critical"
    db.commit()
    # Return the updated issue data
    db.refresh(issue)
    return {"message": f"Issue {issue_id} has been escalated to Critical.", "priority": issue.priority}

