from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Prijatelj(BaseModel):
    id_prijateljstva: int
    id_prijatelja1: int
    id_prijatelja2: int


class ObjavaSchema(BaseModel):
    korisnicko_ime: str
    id_korisnika: int
    tekst_objave: str
    likes: Optional[int] | None = None
    komentari: Optional[str] | None = None
    picture_data: Optional[str] | None = None
    picture_name: Optional[str] | None = None

class Oglas(BaseModel):
    ime_igraca: str
    prezime_igraca: str
    srednje_ime: Optional[str]
    naziv_sporta: str
    slika: Optional[str] | None = None
    longituda: Optional[float]
    latituda: Optional[float]
    naziv_termina: str
    opis_termina: str
    pocetak_termina: datetime
    broj_slobodnih_mjesta: int
