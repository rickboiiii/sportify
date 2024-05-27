from sqlalchemy.orm import Session

from backend.models import Igrac, Vlasnik, Korisnik


def get_all_profiles(db: Session):
    all_profiles = {
        'svi_korisnici': get_igraci(db),
        'svi_vlasnici': get_vlasnici(db)
    }
    return all_profiles


def get_all_profiles_username(username: str, db: Session):
    all_profiles = {
        'svi_korisnici': get_igraci(db, {'username': username}),
        'svi_vlasnici': get_vlasnici(db, {'username': username})
    }
    return all_profiles


def get_igraci(db: Session, options: dict = None):
    igraci = db.query(Igrac).join(Korisnik)

    if options is not None:
        if 'id_igraca' in options:
            igraci = igraci.filter(Igrac.id_igraca == options['id_igraca'])
        if 'username' in options:
            igraci = igraci.filter(Korisnik.korisnicko_ime.like(options['username']))
        if 'first' in options:
            igraci = igraci.first()
        if 'limit' in options:
            igraci = igraci.limit(options['limit'])
    else:
        igraci = igraci.all()

    return igraci


def get_vlasnici(db: Session, options: dict = None):
    vlasnici = db.query(Vlasnik).join(Korisnik)

    if options is not None:
        if 'id_vlasnika' in options:
            vlasnici = vlasnici.filter(Vlasnik.id_vlasnika == options['id_vlasnika'])
        if 'username' in options:
            vlasnici = vlasnici.filter(Korisnik.korisnicko_ime.like(options['username']))
        if 'first' in options:
            vlasnici = vlasnici.first()
        if 'limit' in options:
            vlasnici = vlasnici.limit(options['limit'])
    else:
        vlasnici = vlasnici.all()

    return vlasnici
