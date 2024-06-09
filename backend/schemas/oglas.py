from pydantic import BaseModel

from typing import Optional
from datetime import datetime

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