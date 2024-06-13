from datetime import date
from pydantic import BaseModel

class KorisnikSchema(BaseModel):
    email: str
    korisnicko_ime: str
    id_korisnika: int

class IgracUser(BaseModel):
    ime_igraca: str
    prezime_igraca: str
    srednje_ime: str | None = None
    datum_rodjenja: date
    spol: bool
    visina: int
    tezina: int
    nivo_sposobnosti: str
    max_dozvoljena_udaljenost: int
    verifikovan: bool
    recenzija: float
    id_igraca: int
    korisnici: KorisnikSchema | None = None

    class Config:
        from_attributes: True


class VlasnikUser(BaseModel):
    ime_vlasnika: str
    prezime_vlasnika: str
    srednje_ime: str | None = None
    datum_rodjenja: date
    spol: bool
    recenzija: float
    id_vlasnika: int
    korisnici: KorisnikSchema | None = None

    class Config:
        from_attributes = True


class Users(BaseModel):
    svi_korisnici: list[IgracUser]
    svi_vlasnici: list[VlasnikUser]

    class Config:
        from_attributes = True
