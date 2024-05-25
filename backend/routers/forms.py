from fastapi import APIRouter, Depends, FastAPI, HTTPException
from jose import JWTError, jwt
from backend.dependencies import get_db
from datetime import datetime, timedelta
from database import Base, SessionLocal, engine
from models_singleton import Event_u_pripremi
router = APIRouter()



@router.post("/oglas_eventa")
async def napravi_event(naziv_termina: str, opis_termina: str, lokacija: int, pocetak_termina: datetime, broj_slobodnih_mjesta: int, sport: int):
    novi_termin = Event_u_pripremi(naziv_termina,opis_termina,lokacija,pocetak_termina,broj_slobodnih_mjesta,sport )
    db.add(novi_termin)
    db.commit()
    db.refresh(novi_termin)
    return novi_termin

#par je specijalan slucaj, max i min broj igraca je 1
@router.post("/kreiranje_para")
async def kreiraj_par(naziv_termina: str, opis_termina: str, lokacija: int, pocetak_termina: datetime, broj_slobodnih_mjesta: int, sport: int,nivo_sposobnosti: int):
    novi_par = Event_u_pripremi(naziv_termina,opis_termina,lokacija,pocetak_termina,broj_slobodnih_mjesta,sport, nivo_sposobnosti)
    db.add(novi_par)
    db.commit()
    db.refresh(db_par)
    return db_par

#ruta za lokaciju;promijeniti na kojoj stranici treba da bude
@router.post('/lokacija', async (req, res) => {
  try {
    const novaAdresa = await Adresa.create(req.body);
    res.status(200).send(novaAdresa);
  } catch (error) {
    res.status(500).send(error);
  }
});
