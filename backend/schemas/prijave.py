from pydantic import BaseModel

class PrijaveKorisnikaSchema(BaseModel):
    id_korisnika: int
    id_eventa : int