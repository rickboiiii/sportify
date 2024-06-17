from pydantic import BaseModel

from backend.schemas import Igrac, KorisnikSchema, Vlasnik, KorisnikPrijateljSchema


class IgracProfil(Igrac):
    id_igraca: int
    korisnici: KorisnikSchema | None = None

    class Config:
        from_attributes: True


class UpdateIgracProfil(IgracProfil):
    pass


class VlasnikProfil(Vlasnik):
    id_vlasnika: int
    korisnici: KorisnikSchema | None = None 

    class Config:
        from_attributes = True


class UpdateVlasnikProfil(VlasnikProfil):
    pass


class Profili(BaseModel):
    svi_korisnici: list[IgracProfil]
    svi_vlasnici: list[VlasnikProfil]

    class Config:
        from_attributes = True


class PrijateljiProfil(BaseModel):
    user_id: int
    friends: list[KorisnikPrijateljSchema]

    class Config:
        from_attributes = True
