from datetime import date

from pydantic import BaseModel


class Vlasnik(BaseModel):
    ime_vlasnika: str
    prezime_vlasnika: str
    srednje_ime: str 
    datum_rodjenja: date
    spol: bool
    recenzija: float


class VlasnikSchema(Vlasnik):
    id_korisnika: int
