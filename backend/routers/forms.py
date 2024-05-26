from fastapi import APIRouter, Depends, FastAPI, HTTPException
from jose import JWTError, jwt
from backend.dependencies import get_db
from datetime import datetime, timedelta
from backend.models_singleton import Event_u_pripremi
from pydantic import BaseModel
from sqlalchemy.orm import Session

router = APIRouter()

class Event(BaseModel) :
 naziv_termina: str
 opis_termina: str
 id_lokacije: int
 pocetak_termina: datetime
 broj_slobodnih_mjesta: int
 sport: int
 class Config:
    from_attributes: True

class Event_u_pripremi_create(Event_u_pripremi) :
   pass


@router.post("/oglas_eventa")
async def napravi_event(event: Event, db: Session = Depends(get_db)):
    novi_termin = Event_u_pripremi_create(**event.dict())
    db.add(novi_termin)
    db.commit()
    db.refresh(novi_termin)
    return novi_termin

#par je specijalan slucaj, max i min broj igraca je 1
@router.post("/kreiranje_para")
async def kreiraj_par(naziv_termina: str, opis_termina: str, lokacija: int, pocetak_termina: datetime, broj_slobodnih_mjesta: int, sport: int,nivo_sposobnosti: int):
    db_par = Event_u_pripremi(naziv_termina,opis_termina,lokacija,pocetak_termina,broj_slobodnih_mjesta,sport, nivo_sposobnosti)
    get_db.add(db_par)
    get_db.commit()
    get_db.refresh(db_par)
    return db_par


class Adresa(BaseModel):
    naziv_ulice: str
    postanski_broj: int
    grad: str
    drzava: str

    class Config:
        orm_mode = True
class Adresa_create(Adresa) :
   pass

@router.post("/spremi_lokaciju")
async def spremi_lokaciju(adresa: Adresa, db: Session = Depends(get_db)):
    nova_adresa = Adresa_create(**adresa.dict())
    db.add(nova_adresa)
    db.commit()
    db.refresh(nova_adresa)
    return nova_adresa
