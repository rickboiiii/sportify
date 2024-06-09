from pydantic import BaseModel

class ObjavaSchema(BaseModel):
    korisnicko_ime:str
    id_korisnika:int
    tekst_objave:str
    #slika
    