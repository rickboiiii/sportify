from sqlalchemy import Column, ForeignKey, Integer, Float, CheckConstraint, String
from sqlalchemy.orm import relationship

from backend.database import Base

class Objava(Base):
    __tablename__="objave"
    id_objave=Column(Integer, autoincrement=True, primary_key=True)
    id_korisnika=Column(Integer, ForeignKey("korisnici.id_korisnika"))
    tekst_objave=Column(String)
    #slika
    