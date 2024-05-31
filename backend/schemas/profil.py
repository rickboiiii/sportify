from pydantic import BaseModel

from backend.schemas import Igrac, KorisnikSchema, Vlasnik
from typing import List


class IgracProfil(Igrac):
    id_igraca: int
    korisnici: KorisnikSchema 

    class Config:
        from_attributes: True


class VlasnikProfil(Vlasnik):
    id_vlasnika: int
    korisnici: KorisnikSchema 

    class Config:
        from_attributes = True


class Profili(BaseModel):
    svi_korisnici: List[IgracProfil]
    svi_vlasnici: List[VlasnikProfil]

    class Config:
        from_attributes = True
