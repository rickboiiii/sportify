from pydantic import BaseModel

from backend.schemas.igrac import Igrac
from backend.schemas.korisnik import KorisnikSchema
from backend.schemas.vlasnik import Vlasnik


class IgracProfil(Igrac):
    id_igraca: int
    korisnici: KorisnikSchema | None = None

    class Config:
        from_attributes: True


class VlasnikProfil(Vlasnik):
    id_vlasnika: int
    korisnici: KorisnikSchema | None = None

    class Config:
        from_attributes = True


class Profili(BaseModel):
    svi_korisnici: list[IgracProfil]
    svi_vlasnici: list[VlasnikProfil]

    class Config:
        from_attributes = True
