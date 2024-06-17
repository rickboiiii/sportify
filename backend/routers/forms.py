from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request
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
 potreban_nivo_sposobnosti: str
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


    

class AdresaSchema(BaseModel):
    naziv_ulice: str
    postanski_broj: int
    grad: str
    drzava: str

    class Config:
        form_attributes = True

class AdresaCreate(AdresaSchema):
    pass


@router.post("/spremi_lokaciju")
async def spremi_lokaciju(adresa: AdresaCreate, db: Session = Depends(get_db)):
    nova_adresa = AdresaCreate(id_organizatora=1, naziv_ulice=adresa.naziv_ulice, postanski_broj=adresa.postanski_broj, grad=adresa.grad, drzava=adresa.drzava)  
    db.add(nova_adresa)
    db.commit()
    db.refresh(nova_adresa)
    


class LokacijaSchema(BaseModel):
    id_adrese: int
    recenzija: float
    cijena_po_terminu: float
    naziv_lokacije: str
    opis_lokacije: str
    kapacitet: int
    

    class Config:
        form_attributes = True

class LokacijaCreate(LokacijaSchema):
    pass

@router.post("/kreiraj_teren")
async def kreiraj_teren(teren: LokacijaCreate, db: Session = Depends(get_db)):
    nova_lokacija = Lokacija(id_vlasnika=1, id_adrese=teren.id_adrese,recenzija=teren.recenzija,cijena_po_terminu=teren.cijena_po_terminu, naziv_lokacije=teren.naziv_lokacije, opis_lokacije=teren.opis_lokacije, kapacitet=teren.kapacitet)  
    db.add(nova_lokacija)
    db.commit()
    db.refresh(nova_lokacija)

#rute za meet&greet i lost&found
class MeetAndGreetSchema(BaseModel):
    kapacitet: int
    id_sporta: int
    id_lokacije: int
    datum_odrzavanja: datetime
    naziv_okupljanja: str
    opis_okupljanja: str

    class Config:
        form_attributes = True

class MeetAndGreetCreate(MeetAndGreetSchema):
    pass

@router.post("/meet_and_greet")
async def meet_and_greet(okupljanje: MeetAndGreetCreate, db: Session = Depends(get_db)):
    novi_meet = MeetAndGreet(
        kapacitet=okupljanje.kapacitet,
        id_sporta=okupljanje.id_sporta,
        id_lokacije=okupljanje.id_lokacije,
        datum_odrzavanja=okupljanje.datum_odrzavanja,
        naziv_okupljanja=okupljanje.naziv_okupljanja,
        opis_okupljanja= okupljanje.opis_okupljanja,
    )
    db.add(novi_meet)
    db.commit()
    db.refresh(novi_meet)


class LostAndFoundSchema(BaseModel):
    tag: str
    opis: str
    id_lokacije: int
    slika: str
    

    class Config:
        form_attributes = True

class LostAndFoundCreate(LostAndFoundSchema):
    pass

@router.post("/lost_and_found")
async def lost_and_found(predmet: LostAndFoundCreate, db: Session = Depends(get_db)):
    novi_predmet = LostAndFound(tag=predmet.tag, opis=predmet.opis, id_lokacije=predmet.id_lokacije, slika= predmet.slika)  
    db.add(novi_predmet)
    db.commit()
    db.refresh(novi_predmet)

# def upload_picture_lost(db: Session, img_data: UploadPicture):
#     db.query(LostAndFound).filter(Igrac.id_losta == img_data.id).update({
#         LostAndFound.picture_data: img_data.picture_data,
#         LostAndFound.picture_name: hashlib.md5(img_data.picture_name.encode('utf-8')).hexdigest()
#     })
#     db.commit()

#     igrac = db.query(Igrac).join(Korisnik).filter(Igrac.id_igraca == img_data.id).first()

#     return igrac


class LocationKeywordsSchema(BaseModel):
    id_lokacije: int
    naziv_lokacije: str


@router.get("/all-locations")
async def all_locations(db: Session = Depends(get_db)) -> list[LocationKeywordsSchema]:
    lokacije = db.query(Lokacija).all()

    final_lokacije = []
    for lokacija in lokacije:
        if lokacija.naziv_lokacije is not None:
            final_lokacije.append({
                'id_lokacije': lokacija.id_lokacije,
                'naziv_lokacije': lokacija.naziv_lokacije
            })

    return final_lokacije