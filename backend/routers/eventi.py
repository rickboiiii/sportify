from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import backend.models.event_u_pripremi

from backend.dependencies import get_db

router = APIRouter()

@router.get("/eventi/", tags=["events"])
async def get_events(db: Session = Depends(get_db)):
    try:
        events = db.query(backend.models.event_u_pripremi.Event_u_pripremi).all()
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")