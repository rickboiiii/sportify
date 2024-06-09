from pydantic import BaseModel


class RecenzijaVlasnikaSchema(BaseModel):
    komentar: str
    ocjena: float
