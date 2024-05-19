from datetime import date

from pydantic import BaseModel


class Vlasnik(BaseModel):
    ime_vlasnika: str
    prezime_vlasnika: str
    srednje_ime: str | None = None
    datum_rodjenja: date
    spol: bool
    recenzija: float
