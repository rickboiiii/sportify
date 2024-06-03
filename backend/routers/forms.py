from fastapi import APIRouter, Depends, FastAPI, HTTPException
from jose import JWTError, jwt
from backend.dependencies import get_db
from datetime import datetime, timedelta
from backend.models import Event_u_pripremi, Adresa, Lokacija, MeetAndGreet, LostAndFound
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
 spol : bool
 potreban_nivo_sposobnosti: int
 class Config:
    from_attributes: True

class Event_u_pripremi_create(Event_u_pripremi) :
   pass


@router.post("/oglas_eventa")
async def napravi_event(event: Event, db: Session = Depends(get_db)):
    novi_termin = Event_u_pripremi_create(
        id_lokacije=event.id_lokacije, id_organizatora=1,
        id_sporta=event.sport, naziv_termina=event.naziv_termina,
        opis_termina=event.opis_termina, vrsta_termina='Termin',
        pocetak_termina=event.pocetak_termina, potreban_nivo_sposobnosti=event.potreban_nivo_sposobnosti,
        spol=event.spol, minimalan_broj_igraca=2, maksimalan_broj_igraca=100,
        broj_slobodnih_mjesta=event.broj_slobodnih_mjesta, popunjen=False)
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

class AdresaBase(BaseModel):
    naziv_ulice: str
    postanski_broj: int
    grad: str
    drzava: str

    class Config:
        form_attributes = True

class AdresaCreate(Adresa):
    pass


@router.post("/spremi_lokaciju")
async def spremi_lokaciju(adresa: AdresaBase, db: Session = Depends(get_db)):
    nova_adresa = AdresaCreate(naziv_ulice=adresa.naziv_ulice, postanski_broj=adresa.postanski_broj, grad=adresa.grad, drzava=adresa.drzava)  
    db.add(nova_adresa)
    db.commit()
    db.refresh(nova_adresa)
    return nova_adresa


class LokacijaBase(BaseModel):
    naziv_terena: str
    opis_terena: str
    id_terena: int
    recenzija: str
    cijena_po_terminu: int
    

    class Config:
        form_attributes = True

class LokacijaCreate(LokacijaBase):
    pass

@router.post("/kreiraj_teren")
async def kreiraj_teren(teren: LokacijaBase, db: Session = Depends(get_db)):
    nova_lokacija = Lokacija(naziv_terena=teren.naziv_terena, opis_terena=teren.opis_terena, id_lokacije=teren.id_terena, recenzija="2", cijena_po_terminu=teren.cijena_po_terminu)  
    db.add(nova_lokacija)
    db.commit()
    db.refresh(nova_lokacija)
    return nova_lokacija

#rute za meet&greet i lost&found
class MeetAndGreetBase(BaseModel):
    kapacitet: int
    id_sporta: int
    id_lokacije: int
    datum_odrzavanja: datetime
    naziv_okupljanja: str

    class Config:
        form_attributes = True

class MeetAndGreetCreate(MeetAndGreetBase):
    pass

class MeetAndGreetCreate(MeetAndGreetBase):
    pass
@router.post("/meet_and_greet")
async def meet_and_greet(okupljanje: MeetAndGreetCreate, db: Session = Depends(get_db)):
    novi_meet = MeetAndGreet(
        naziv_okupljanja=okupljanje.naziv_okupljanja,
        opis_okupljanja= okupljanje.opis_okupljanja,
        kapacitet=okupljanje.kapacitet,
        id_sporta=okupljanje.id_sporta,
        id_lokacije=okupljanje.id_lokacije,
        datum_odrzavanja=okupljanje.datum_odrzavanja
    )
    db.add(novi_meet)
    db.commit()
    db.refresh(novi_meet)
    return novi_meet

class LostAndFoundBase(BaseModel):
    tag: str
    opis: str
    id_lokacije: int
    

    class Config:
        form_attributes = True

class LostAndFoundCreate(LostAndFoundBase):
    pass

@router.post("/lost_and_found")
async def lost_and_found(predmet: LostAndFoundBase, db: Session = Depends(get_db)):
    novi_predmet = Lokacija(tag=predmet.tag, opis=predmet.opis, id_lokacije=predmet.id_lokacije, slika= predmet.slika)  
    db.add(novi_predmet)
    db.commit()
    db.refresh(novi_predmet)
    return novi_predmet
