from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional, List
from models import *

class Korisnik(BaseModel):
    id_korisnika: int
    email: str
    sifra: str
    korisnicko_ime: str
    id_uloge: bool
    uloga: int

class Prijatelj(BaseModel):
    id_prijateljstva: int
    id_prijatelja1: int
    id_prijatelja2: int

class Igrac(BaseModel):
    id_igraca: int
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
    id_vlasnika: int
    ime_vlasnika: str
    prezime_vlasnika: str
    srednje_ime: str
    datum_rodjenja: date
    spol: bool
    recenzija: float

class Uloga(BaseModel):
    id_uloge: int
    naziv_uloge: str
    id_korisnika: int

class Lokacija(BaseModel):
    id_lokacije: int
    id_vlasnika: int
    id_adrese: int
    recenzija: float
    cijena_po_terminu: Optional[float]

class Adresa(BaseModel):
    id_adrese: int
    naziv_ulice: str
    postanski_broj: int
    grad: str
    drzava: str

class Slobodni_Event(BaseModel):
    id_eventa: int
    id_lokacije: int
    pocetak_termina: datetime
    kraj_termina: datetime
    

class Event_u_pripremi(BaseModel):
    id_eventa: int
    id_lokacije: int
    id_organizatora: int
    id_sporta: int
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
    id_ekipe: int
    naziv_ekipe: str
    id_sporta: int

class Turnir(BaseModel):
    id_turnira: int
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
    id_sporta: int
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
    id_recenzije_vlasnika: int
    id_vlasnika: int
    komentar: str
    ocjena: float

class RecenzijaIgraca(BaseModel):
    id_recenzije_igraca: int
    id_igraca: int
    komentar: str
    ocjena: float

class RecenzijaTerena(BaseModel):
    id_recenzije_terena: int
    id_terena: int
    komentar: str
    ocjena: float
