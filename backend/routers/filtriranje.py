from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc, func, Numeric, alias, TableValuedAlias, asc

from backend.models.event_u_pripremi import Event_u_pripremi
from backend.models.igrac import Igrac
from backend.models.sport import Sifarnik_sportova
from backend.models.objava import Objava
from backend.models.lokacija import Lokacija
from backend.models.prijatelj import Prijatelj
from backend.models.korisnik import Korisnik
from backend.schemas.objave import ObjavaSchema, Oglas

from backend.dependencies import get_db

router = APIRouter()


@router.post("/testPrijateljstva/{id1}/{id2}")
async def dodaj(id1: int, id2: int, db: Session = Depends(get_db)):
    novo_prijateljstvo = Prijatelj(id_prijatelja1=id1, id_prijatelja2=id2)
    db.add(novo_prijateljstvo)
    db.commit()

    db.refresh(novo_prijateljstvo)


@router.get("/dajObjavePrijatelja/{id}")
async def objave(id: int, db: Session = Depends(get_db)):
    result = db.query(Prijatelj).filter(Prijatelj.id_prijatelja1 == id) \
        .join(Objava, Prijatelj.id_prijatelja2 == Objava.id_korisnika).join(Korisnik,
                                                                            Korisnik.id_korisnika == Prijatelj.id_prijatelja2). \
        add_columns(Prijatelj.id_prijatelja2, Objava.tekst_objave, Korisnik.korisnicko_ime).all()
    return [
        ObjavaSchema(id_korisnika=row.id_prijatelja2, tekst_objave=row.tekst_objave, korisnicko_ime=row.korisnicko_ime)
        for row in result]


# @app.get("/events-in-preparation/")
# def get_events_in_preparation(db: Session = Depends(database.get_db)):
#     result = db.query(models.Event_u_pripremi)\
#                .join(models.Event, models.Event_u_pripremi.id_eventa == models.Event.id)\
#                .join(models.Igrac, models.Event.id_igraca == models.Igrac.id)\
#                .join(models.Lokacija, models.Event.id_lokacije == models.Lokacija.id)\
#                .add_columns(models.Igrac.ime, models.Igrac.prezime, models.Event.naziv, models.Lokacija.naziv.label("lokacija_naziv"))\
#                .all()
#     return result

@router.get("/pretraziPrijatelje/{id}/{username}/{svi}")
async def pretrazi_username(id: int, username: str, svi: bool, db: Session = Depends(get_db)):
    id_korisnika = db.query(Korisnik.id_korisnika).join(Igrac, Igrac.id_korisnika == Korisnik.id_korisnika).first()
    if (svi == True):
        return db.query(Korisnik).join(Prijatelj, Korisnik.id_korisnika == Prijatelj.id_prijatelja2) \
            .filter(Prijatelj.id_prijatelja1 == id_korisnika[0]).all()
    return db.query(Korisnik).join(Prijatelj, Korisnik.id_korisnika == Prijatelj.id_prijatelja2) \
        .filter(Prijatelj.id_prijatelja1 == id_korisnika[0], Korisnik.korisnicko_ime.like(f"{username}%")).all()
# Igrac.ime.like(f"{ime}%")