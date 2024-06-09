from pydantic import BaseModel


class RecenzijaTerena(BaseModel):
    komentar: str
    ocjena: float
