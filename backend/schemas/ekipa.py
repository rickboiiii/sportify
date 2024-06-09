from pydantic import BaseModel
from typing import  List

class EkipaSchema(BaseModel):
    naziv_ekipe: str
    id_sporta: int
    id_kapitena:int

class EkipaSaClanovimaSchema(BaseModel):
      id_ekipe:int
      igraci:List[int] 