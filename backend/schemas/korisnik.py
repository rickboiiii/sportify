from pydantic import BaseModel


class KorisnikSchema(BaseModel):
    email: str
    korisnicko_ime: str



class Korisnik(KorisnikSchema):
    sifra: str


class KorisnikSchema2(Korisnik):
    uloga: int
