from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from backend.database import Base

from backend.models.uloga import Uloga


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
    # prijatelj1 = relationship("Prijatelj", back_populates="korisnik1")
    # prijatelj2 = relationship("Prijatelj", back_populates="korisnik2")
