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

@router.get("/dajFiltriraneOglase/{id_sporta}/{nivo}/{spol}")
async def eventi(id_sporta: int, nivo: str, spol: int, db: Session = Depends(get_db)):
    spol_bool = 2
    if (spol == 0):
        spol_bool = False
    elif (spol == 1):
        spol_bool = True
    # if (spol_bool!=2):
    #     if(nivo!="svi"):
    #         if(id_sporta!=0):
    #             result=db.query(Event_u_pripremi).filter(Event_u_pripremi.spol==spol_bool, Event_u_pripremi.potreban_nivo_sposobnosti==nivo, Event_u_pripremi.id_sporta==id_sporta)
    #         else:
    #              result=db.query(Event_u_pripremi).filter(Event_u_pripremi.spol==spol_bool, Event_u_pripremi.potreban_nivo_sposobnosti==nivo)

    #     else:
    #         if(id_sporta!=0):
    #             result=db.query(Event_u_pripremi).filter(Event_u_pripremi.spol==spol_bool, Event_u_pripremi.id_sporta==id_sporta)
    #         else:
    #              result=db.query(Event_u_pripremi).filter(Event_u_pripremi.spol==spol_bool)
    # else:
    #     if(nivo!="svi"):
    #         if(id_sporta!=0):
    #             result=db.query(Event_u_pripremi).filter( Event_u_pripremi.potreban_nivo_sposobnosti==nivo, Event_u_pripremi.id_sporta==id_sporta)
    #         else:
    #              result=db.query(Event_u_pripremi).filter( Event_u_pripremi.potreban_nivo_sposobnosti==nivo)

    #     else:
    #         if(id_sporta!=0):
    #             result=db.query(Event_u_pripremi).filter( Event_u_pripremi.id_sporta==id_sporta)
    #         else:
    #              result=db.query(Event_u_pripremi)
    result = db.query(Event_u_pripremi)
    if (id_sporta != 0):
        result = result.filter(Event_u_pripremi.id_sporta == id_sporta)
    if (nivo != "svi"):
        result = result.filter(Event_u_pripremi.potreban_nivo_sposobnosti == nivo)
    if (spol_bool != 2):
        result = result.filter(Event_u_pripremi.spol == spol_bool)
    result = result.join(Igrac, Event_u_pripremi.id_organizatora == Igrac.id_igraca).join(Lokacija,
                                                                                          Event_u_pripremi.id_lokacije == Lokacija.id_lokacije) \
        .join(Sifarnik_sportova, Event_u_pripremi.id_sporta == Sifarnik_sportova.id_sporta).order_by(
        asc(Event_u_pripremi.pocetak_termina)) \
        .add_columns(Igrac.ime_igraca, Igrac.srednje_ime, Igrac.prezime_igraca, Igrac.srednje_ime,
                     Sifarnik_sportova.naziv_sporta, Lokacija.longituda, Lokacija.latituda,
                     Event_u_pripremi.naziv_termina, Event_u_pripremi.opis_termina, Event_u_pripremi.pocetak_termina,
                     Event_u_pripremi.broj_slobodnih_mjesta).all()
    # [SportistaSport(naziv_sporta=row.naziv_sporta, ime=row.ime_igraca, prezime=row.prezime_igraca, rating=row.recenzija) for row in results]
    return [Oglas(ime_igraca=row.ime_igraca, prezime_igraca=row.prezime_igraca, srednje_ime=row.srednje_ime,
                  naziv_sporta=row.naziv_sporta, longituda=row.longituda, latituda=row.latituda,
                  naziv_termina=row.naziv_termina, opis_termina=row.opis_termina, pocetak_termina=row.pocetak_termina,
                  broj_slobodnih_mjesta=row.broj_slobodnih_mjesta) for row in result]


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