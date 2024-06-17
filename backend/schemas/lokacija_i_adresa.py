from pydantic import BaseModel, deprecated
from datetime import datetime, date
from typing import Optional, List

from typing_extensions import deprecated

class LokacijaSchema(BaseModel):
    id_vlasnika:int
    naziv_lokacije: str
    opis_Lokacije : str
    recenzija: float
    cijena_po_terminu: Optional[float]
    longituda:float
    latituda:float
    kapacitet:int

class AdresaSchema(BaseModel):
    
    naziv_ulice: str
    postanski_broj: int
    grad: str
    drzava: str
    


