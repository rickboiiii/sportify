from pydantic import BaseModel


class RecenzijaIgracaSchema(BaseModel):
    komentar: str
    ocjena: float
