from pydantic import BaseModel


class RecenzijaTerenaSchema(BaseModel):
    komentar: str
    ocjena: float
