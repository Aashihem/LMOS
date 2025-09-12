# server/routes/dashboard_routes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import ReservationRequest # Make sure to import all needed models

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)

@router.get("/faculty")
def get_faculty_dashboard_stats(db: Session = Depends(get_db)):
    try:
        # 1. Get Pending Reservation Count from the existing model
        pending_requests_count = db.query(ReservationRequest).filter(ReservationRequest.status == 'Pending').count() # Assuming you add a 'status' column

        # --- Placeholders for models you need to create ---
        # TODO: Create an 'Issue' model and table to track reported issues.
        # reported_issues_count = db.query(Issue).filter(Issue.status == 'Open').count()
        reported_issues_count = 7 # Placeholder

        # TODO: Create an 'Experiment' model and table.
        # active_experiments_count = db.query(Experiment).filter(Experiment.status == 'Active').count()
        active_experiments_count = 24 # Placeholder

        # TODO: Create a 'Lab' model and table.
        # laboratories = db.query(Lab).all()
        laboratories_placeholder = [
            { "name": 'Electronics Lab 1', "status": 'Active' },
            { "name": 'Communications Lab', "status": 'Maintenance' },
        ]

        # Combine the stats into a single response object
        return {
            "stats": {
                "pendingRequests": pending_requests_count,
                "reportedIssues": reported_issues_count,
                "activeExperiments": active_experiments_count,
            },
            "laboratories": laboratories_placeholder
            # You can add a query for 'recentActivities' here as well
        }

    except Exception as e:
        # Log the error for debugging
        print(f"Error fetching faculty dashboard stats: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred.")