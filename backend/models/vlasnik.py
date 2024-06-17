from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Float, CheckConstraint, Date, Text
from sqlalchemy.orm import relationship

from backend.database import Base


class Vlasnik(Base):
    __tablename__ = "vlasnici"

    id_vlasnika = Column(Integer, primary_key=True, autoincrement=True)
    id_korisnika = Column(Integer, ForeignKey("korisnici.id_korisnika"), unique=True)
    ime_vlasnika = Column(String)
    prezime_vlasnika = Column(String)
    srednje_ime = Column(String)
    datum_rodjenja = Column(Date)
    spol = Column(Boolean)
    recenzija = Column(Float, CheckConstraint("recenzija>=1 and recenzija<=5"))
    picture_data = Column(Text, nullable=True)
    picture_name = Column(String, nullable=True)
    # data = Column(LargeBinary) PRIKAZ SLIKE ?
    # format = Column(String)  # Dodatni atribut za pohranu formata slike; treba pretvarati u binarno i obratno

    korisnici = relationship("Korisnik", back_populates="vlasnici")
    recenzije_vlasnika = relationship("RecenzijaVlasnika", back_populates="vlasnici")
    lokacije = relationship("Lokacija", back_populates="vlasnici")
