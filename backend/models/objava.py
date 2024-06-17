from sqlalchemy import Column, ForeignKey, Integer, Float, CheckConstraint, String, Text
from sqlalchemy.orm import relationship

from backend.database import Base


class Objava(Base):
    __tablename__ = "objave"
    id_objave = Column(Integer, autoincrement=True, primary_key=True)
    id_korisnika = Column(Integer, ForeignKey("korisnici.id_korisnika"))
    tekst_objave = Column(String)
    picture_data = Column(Text, nullable=True)
    picture_name = Column(String, nullable=True)
    likes = Column(Integer, nullable=True)
    komentari = Column(Text, nullable=True)
    likes = relationship("Likes", back_populates="objave")


class Likes(Base):
    __tablename__ = "likes"
    id_lika = Column(Integer, autoincrement=True, primary_key=True)
    id_korisnika = Column(Integer, ForeignKey("korisnici.id_korisnika"))
    id_objave = Column(Integer, ForeignKey("objave.id_objave"))

    korisnik = relationship("Korisnik", back_populates="likes")
    objave = relationship("Objava", back_populates="likes")
