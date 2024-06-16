from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc, func, Numeric, alias, TableValuedAlias, asc

from backend.models import Vlasnik
from backend.models.event_u_pripremi import Event_u_pripremi
from backend.models.igrac import Igrac
from backend.models.sport import Sifarnik_sportova
from backend.models.objava import Objava
from backend.models.lokacija import Lokacija
from backend.models.prijatelj import Prijatelj
from backend.models.korisnik import Korisnik
from backend.schemas.objave import ObjavaSchema, Oglas
from backend.schemas.korisnik import UserSchema
from backend.dependencies import get_db

router = APIRouter()

@router.get("/get_suggestions/{username}", response_model=List[UserSchema])
async def get_suggestions(username: str, db: Session = Depends(get_db)):
    try:
        # Pronađi korisnika
        user = db.query(Korisnik).filter(Korisnik.korisnicko_ime == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="Korisnik nije pronađen")

        # Pronađi korisnikove prijatelje
        prijatelji = db.query(Prijatelj).filter(
            (Prijatelj.id_prijatelja1 == user.id_korisnika) | (Prijatelj.id_prijatelja2 == user.id_korisnika)).all()

        if not prijatelji:
            # Ako korisnik nema prijatelja, vrati sve korisnike osim trenutnog korisnika
            svi_korisnici = db.query(Korisnik).filter(Korisnik.id_korisnika != user.id_korisnika).all()
            prijedlozi_korisnici = []
            for korisnik in svi_korisnici:
                igrac = db.query(Igrac).filter(Igrac.id_korisnika == korisnik.id_korisnika).first()
                vlasnik = db.query(Vlasnik).filter(Vlasnik.id_korisnika == korisnik.id_korisnika).first()
                ime, prezime, tip_korisnika = None, None, None
                if igrac:
                    ime, prezime, tip_korisnika = igrac.ime_igraca, igrac.prezime_igraca, 'Igrac'
                elif vlasnik:
                    ime, prezime, tip_korisnika = vlasnik.ime_vlasnika, vlasnik.prezime_vlasnika, 'Vlasnik'

                prijedlozi_korisnici.append(UserSchema(
                    id_korisnika=korisnik.id_korisnika,
                    korisnicko_ime=korisnik.korisnicko_ime,
                    email=korisnik.email,
                    ime=ime,
                    prezime=prezime,
                    tip_korisnika=tip_korisnika
                ))
            return prijedlozi_korisnici[:5]

        # Pronađi prijatelje korisnikovih prijatelja
        prijatelji_ids = [p.id_prijatelja2 if p.id_prijatelja1 == user.id_korisnika else p.id_prijatelja1 for p in
                          prijatelji]
        prijedlozi = db.query(Prijatelj).filter(
            (Prijatelj.id_prijatelja1.in_(prijatelji_ids)) | (Prijatelj.id_prijatelja2.in_(prijatelji_ids))).all()

        # Izbaci duplikate i trenutnog korisnika
        prijedlozi_ids = set(
            [p.id_prijatelja2 if p.id_prijatelja1 in prijatelji_ids else p.id_prijatelja1 for p in prijedlozi])
        prijedlozi_ids.discard(user.id_korisnika)

        # Dohvati informacije o predloženim korisnicima
        prijedlozi_korisnici = db.query(Korisnik).filter(Korisnik.id_korisnika.in_(prijedlozi_ids)).all()
        prijedlozi_info = []
        for korisnik in prijedlozi_korisnici:
            igrac = db.query(Igrac).filter(Igrac.id_korisnika == korisnik.id_korisnika).first()
            vlasnik = db.query(Vlasnik).filter(Vlasnik.id_korisnika == korisnik.id_korisnika).first()
            ime, prezime, tip_korisnika = None, None, None
            if igrac:
                ime, prezime, tip_korisnika = igrac.ime_igraca, igrac.prezime_igraca, 'Igrac'
            elif vlasnik:
                ime, prezime, tip_korisnika = vlasnik.ime_vlasnika, vlasnik.prezime_vlasnika, 'Vlasnik'

            prijedlozi_info.append(UserSchema(
                id_korisnika=korisnik.id_korisnika,
                korisnicko_ime=korisnik.korisnicko_ime,
                email=korisnik.email,
                ime=ime,
                prezime=prezime,
                tip_korisnika=tip_korisnika
            ))

        return prijedlozi_info[:5]
    except Exception as e:
        raise HTTPException(status_code=500, detail="Došlo je do greške prilikom pronalaska prijatelja")

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

@router.get("/pretraziPrijatelje/{id}/{username}/{svi}")
async def pretrazi_username(id: int, username: str, svi: bool, db: Session = Depends(get_db)):
    id_korisnika = db.query(Korisnik.id_korisnika).join(Igrac, Igrac.id_korisnika == Korisnik.id_korisnika).first()
    if (svi == True):
        return db.query(Korisnik).join(Prijatelj, Korisnik.id_korisnika == Prijatelj.id_prijatelja2) \
            .filter(Prijatelj.id_prijatelja1 == id_korisnika[0]).all()
    return db.query(Korisnik).join(Prijatelj, Korisnik.id_korisnika == Prijatelj.id_prijatelja2) \
        .filter(Prijatelj.id_prijatelja1 == id_korisnika[0], Korisnik.korisnicko_ime.like(f"{username}%")).all()
# Igrac.ime.like(f"{ime}%")