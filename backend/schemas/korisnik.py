from pydantic import BaseModel


class KorisnikSchema(BaseModel):
    email: str
    korisnicko_ime: str


class Korisnik(KorisnikSchema):
    sifra: str