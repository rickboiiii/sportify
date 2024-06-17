from typing import Optional

from pydantic import BaseModel


class KorisnikSchema(BaseModel):
    email: str
    korisnicko_ime: str


class Korisnik(KorisnikSchema):
    sifra: str


class KorisnikSchema2(Korisnik):
    uloga: int


class KorisnikPrijateljSchema(BaseModel):
    id_korisnika: int
    korisnicko_ime: str
    picture_data: str | None


# Schema koja se koristi u Suggested fro you
class UserSchema(BaseModel):
    id_korisnika: int
    korisnicko_ime: str
    email: str
    ime: Optional[str] = None
    prezime: Optional[str] = None
    tip_korisnika: Optional[str] = None  # 'Igrac' ili 'Vlasnik'
    slika: Optional[str] = None
    opis_slike: Optional[str] = None