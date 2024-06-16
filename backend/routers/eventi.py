from urllib import request

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.models import Korisnik, PrijavljeniKorisnici
from backend.models.event_u_pripremi import Event_u_pripremi



from backend.dependencies import get_db

router = APIRouter()

@router.get("/eventi/", tags=["events"])
async def get_events(db: Session = Depends(get_db)):
    try:
        # Pravimo upit koji spaja tabelu Event_u_pripremi sa tabelom Korisnik
        events = db.query(
            Event_u_pripremi,
            Korisnik.korisnicko_ime,
            Korisnik.email
        ).join(
            Korisnik,
            Korisnik.id_korisnika == Event_u_pripremi.id_organizatora
        ).all()

        # Formatiramo rezultate kako bismo uključili korisničko ime i email
        results = []
        for event, korisnicko_ime, email in events:
            event_data = event.__dict__
            event_data['korisnicko_ime'] = korisnicko_ime
            event_data['email'] = email
            results.append(event_data)

        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/user/{username}", tags=["user"])
async def get_user(username: str, db: Session = Depends(get_db)):
    try:
        # Pravimo upit koji u tabeli Korisnik pronalazi korisnika sa prosleđenim korisničkim imenom
        user = db.query(Korisnik).filter(Korisnik.korisnicko_ime == username).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/prijava/{event_id}/{username}", tags=["events"])
async def prijavi_se_na_termin(
        event_id: int,
        username: str,
        db: Session = Depends(get_db)
):
    try:
        # Pronađi korisnika prema korisničkom imenu
        user = db.query(Korisnik).filter(Korisnik.korisnicko_ime == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="Korisnik nije pronađen")

        # Pronađi događaj prema ID-u
        event = db.query(Event_u_pripremi).filter(Event_u_pripremi.id_eventa == event_id).first()
        if not event:
            raise HTTPException(status_code=404, detail="Termin nije pronađen")

        # Provjeri da li ima slobodnih mjesta
        if event.broj_slobodnih_mjesta <= 0:
            raise HTTPException(status_code=400, detail="Nema više slobodnih mesta za ovaj termin")

        # Proveri da li je korisnik već prijavljen na termin
        prijava = db.query(PrijavljeniKorisnici).filter(PrijavljeniKorisnici.id_eventa == event_id, PrijavljeniKorisnici.id_korisnika == user.id_korisnika).first()

        if prijava:
            raise HTTPException(status_code=400, detail="Korisnik je već prijavljen na ovaj termin")

        # Ažuriraj broj slobodnih mjesta
        event.broj_slobodnih_mjesta -= 1

        # Dodaj prijavu u tabelu PrijavljeniKorisnici
        nova_prijava = PrijavljeniKorisnici(id_eventa=event_id, id_korisnika=user.id_korisnika)
        db.add(nova_prijava)
        db.commit()

        return {"message": "Uspešno ste se prijavili na termin."}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Došlo je do greške prilikom prijave na termin")


@router.delete("/odjava/{event_id}/{username}")
async def odjavi_se_sa_termina(
    event_id: int,
    username: str,
    db: Session = Depends(get_db)
):
    try:
        # Pronađi korisnika prema korisničkom imenu
        user = db.query(Korisnik).filter(Korisnik.korisnicko_ime == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="Korisnik nije pronađen")

        # Pronađi događaj prema ID-u
        event = db.query(Event_u_pripremi).filter(Event_u_pripremi.id_eventa == event_id).first()
        if not event:
            raise HTTPException(status_code=404, detail="Termin nije pronađen")

        # Proveri da li je korisnik prijavljen na termin
        prijava = db.query(PrijavljeniKorisnici).filter(PrijavljeniKorisnici.id_eventa == event_id, PrijavljeniKorisnici.id_korisnika == user.id_korisnika).first()
        if not prijava:
            raise HTTPException(status_code=400, detail="Korisnik nije prijavljen na ovaj termin")

        # Ažuriraj broj slobodnih mesta
        event.broj_slobodnih_mjesta += 1

        # Obrisi prijavu iz tabele PrijavljeniKorisnici
        db.delete(prijava)
        db.commit()

        return {"message": "Uspešno ste se odjavili sa termina."}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Došlo je do greške prilikom odjave sa termina")