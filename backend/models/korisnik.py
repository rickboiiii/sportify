from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from backend.database import Base


class Korisnik(Base):
    __tablename__ = "korisnici"

    id_korisnika = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, index=True)
    sifra = Column(String)
    korisnicko_ime = Column(String)
    id_uloge = Column(Integer, ForeignKey("uloge.id_uloge"))

    uloga = relationship("Uloga", back_populates="korisnici")
    igraci = relationship("Igrac", back_populates="korisnici")
    vlasnici = relationship("Vlasnik", back_populates="korisnici")
    prijateljstva1 = relationship("Prijatelj", foreign_keys="[Prijatelj.id_prijatelja1]", back_populates="korisnik1")
    prijateljstva2 = relationship("Prijatelj", foreign_keys="[Prijatelj.id_prijatelja2]", back_populates="korisnik2")
    prijava = relationship("PrijavljeniKorisnici", back_populates="user")
    likes = relationship("Likes", back_populates="korisnik")
