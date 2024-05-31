from pydantic import BaseModel, deprecated
from datetime import datetime, date
from typing import Optional, List

from typing_extensions import deprecated


# from models import *


@deprecated('use class inside schemas/korisnik.py')
class KorisnikSchema(BaseModel):
    email: str
    korisnicko_ime: str
    uloga:int


@deprecated('use class inside schemas/sport.py')
class SportistaSport(BaseModel):
    naziv_sporta: str
    ime: str
    prezime: str
    rating: float


@deprecated('use class inside schemas/sport.py')
class EkipaSport(BaseModel):
    naziv_sporta: str
    ime: str
    winrate: float


@deprecated('use class inside schemas/korisnik.py')
class Korisnik(KorisnikSchema):
    sifra: str

class Prijatelj(BaseModel):
    id_prijateljstva: int
    id_prijatelja1: int
    id_prijatelja2: int

class ObjavaSchema(BaseModel):
    korisnicko_ime:str
    id_korisnika:int
    tekst_objave:str
    #slika
    


class Igrac(BaseModel):
    id_korisnika:int
    ime_igraca: str
    prezime_igraca: str
    srednje_ime: str 
    datum_rodjenja: date
    spol: bool
    visina: int
    tezina: int
    nivo_sposobnosti: str
    max_dozvoljena_udaljenost: int
    verifikovan: bool
    recenzija: float
    sport:int


@deprecated('use class inside schemas/profil.py')
class IgracProfil(Igrac):
    id_igraca: int
    korisnici: KorisnikSchema 

    class Config:
        from_attributes: True


@deprecated('use class inside schemas/vlasnik.py')
class Vlasnik(BaseModel):
    id_korisnika:int
    ime_vlasnika: str
    prezime_vlasnika: str
    srednje_ime: str 
    datum_rodjenja: date
    spol: bool
    recenzija: float


@deprecated('use class inside schemas/profil.py')
class VlasnikProfil(Vlasnik):
    id_vlasnika: int
    # korisnici: KorisnikSchema 

    class Config:
        from_attributes = True


@deprecated('use class inside schemas/profil.py')
class Profili(BaseModel):
    # svi_korisnici: list[IgracProfil]
    # svi_vlasnici: list[VlasnikProfil]

    class Config:
        from_attributes = True

class Uloga(BaseModel):
    naziv_uloge: str
    id_korisnika: int

class Lokacija(BaseModel):
    longituda:float
    latituda:float
    recenzija: float
    cijena_po_terminu: Optional[float]

class Adresa(BaseModel):
    naziv_ulice: str
    postanski_broj: int
    grad: str
    drzava: str

class Slobodni_Event(BaseModel):
    pocetak_termina: datetime
    kraj_termina: datetime
    

class Event_u_pripremi(BaseModel):
    naziv_termina: Optional[str]
    opis_termina: Optional[str]
    vrsta_termina: str
    pocetak_termina: datetime
    potreban_nivo_sposobnosti: int
    spol: Optional[bool]
    minimalan_broj_igraca: int
    maksimalan_broj_igraca: int
    broj_slobodnih_mjesta: int
    popunjen: bool
    id_lokacije: Optional[int]=None

class Ekipa(BaseModel):
    naziv_ekipe: str
    id_sporta: int

class Turnir(BaseModel):
    naziv_turnira: str
    kotizacija: int
    organizator: int
    id_sporta: int
    id_lokacije: int

class Veza_igrac_ekipa(BaseModel):
    id_veze: int
    id_ekipe: int
    id_igraca: int

class Sifarnik_sportova(BaseModel):
    naziv_sporta: str
    broj_igraca: int
    zatvorenog_tipa: bool
    

class Veza_igrac_termin_u_pripremi(BaseModel):
    id_veze: int
    id_igraca: int
    id_eventa: int

class Veza_ekipa_turnir(BaseModel):
    id_veze:int
    id_ekipe:int
    id_turnira:int 
    

class Veza_lokacija_sport(BaseModel):
    id_veze: int
    id_lokacije: int
    id_sporta: int


class Veza_igrac_sport(BaseModel):
    id_veze: int
    id_igraca: int
    id_sporta: int


class RecenzijaVlasnika(BaseModel):
    komentar: str
    ocjena: float

class RecenzijaIgraca(BaseModel):
    komentar: str
    ocjena: float

class RecenzijaTerena(BaseModel):
    komentar: str
    ocjena: float

class Oglas(BaseModel):
    ime_igraca:str
    prezime_igraca: str
    srednje_ime:Optional[str ]
    naziv_sporta: str
    longituda:float
    latituda:float
    naziv_termina: str
    opis_termina:str
    pocetak_termina: datetime
    broj_slobodnih_mjesta: int
    
    