from pydantic import BaseModel


class SportistaSport(BaseModel):
    naziv_sporta: str
    ime: str
    prezime: str
    rating: float


class EkipaSport(BaseModel):
    naziv_sporta: str
    ime: str
    winrate: float
