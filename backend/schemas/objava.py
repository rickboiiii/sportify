from typing import Optional

from pydantic import BaseModel

class ObjavaSchema(BaseModel):
    korisnicko_ime:str
    id_korisnika:int
    tekst_objave:str
    likes: Optional[int] | None = None
    komentari: Optional[str] | None = None
    picture_data: Optional[str] | None = None
    picture_name: Optional[str] | None = None


class Likes(BaseModel):
    id_korisnika:int
    id_objave:int
