from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional, List
from models import *

class KorisnikSchema(BaseModel):
    email: str
    sifra: str
    korisnicko_ime: str
  

class Prijatelj(BaseModel):
    id_prijateljstva: int
    id_prijatelja1: int
    id_prijatelja2: int

class Igrac(BaseModel):
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

class Vlasnik(BaseModel):
    ime_vlasnika: str
    prezime_vlasnika: str
    srednje_ime: str
    datum_rodjenja: date
    spol: bool
    recenzija: float

class Uloga(BaseModel):
    naziv_uloge: str
    id_korisnika: int

class Lokacija(BaseModel):
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
