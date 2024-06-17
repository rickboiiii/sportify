from datetime import date
from pydantic import BaseModel


class Igrac(BaseModel):
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
    picture_data: str | None = None
    picture_name: str | None = None


class IgracSchema(Igrac):
    id_korisnika: int
    sport: int


class UserUpdateIgrac(BaseModel):
    ime_igraca: str
    prezime_igraca: str
    srednje_ime: str | None = None
    datum_rodjenja: date
    spol: bool
    visina: int
    tezina: int
    max_dozvoljena_udaljenost: int
