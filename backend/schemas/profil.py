from pydantic import BaseModel

from backend.schemas import Igrac, KorisnikSchema, Vlasnik



class IgracProfil(Igrac):
    id_igraca: int | None = None
    korisnici: KorisnikSchema 

    class Config:
        from_attributes: True


class VlasnikProfil(Vlasnik):
    id_vlasnika: int | None = None
    korisnici: KorisnikSchema 

    class Config:
        from_attributes = True


class Profili(BaseModel):
    svi_korisnici: list[IgracProfil]
    svi_vlasnici: list[VlasnikProfil]

    class Config:
        from_attributes = True
