from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Float, CheckConstraint, Text
from sqlalchemy.orm import relationship

from backend.database import Base


class Igrac(Base):
    __tablename__ = "igraci"

    id_igraca = Column(Integer, primary_key=True, autoincrement=True)
    id_korisnika = Column(Integer, ForeignKey("korisnici.id_korisnika"), unique=True)
    ime_igraca = Column(String)
    prezime_igraca = Column(String)
    srednje_ime = Column(String)
    datum_rodjenja = Column(String)
    spol = Column(Boolean)
    visina = Column(Integer)
    tezina = Column(Integer)
    nivo_sposobnosti = Column(String)
    max_dozvoljena_udaljenost = Column(Integer)
    verifikovan = Column(Boolean)
    recenzija = Column(Float, CheckConstraint("recenzija>=1 and recenzija<=5"))
    picture_data = Column(Text, nullable=True)
    picture_name = Column(String, nullable=True)
    # data = Column(LargeBinary) PRIKAZ SLIKE ?
    # format = Column(String)  # Dodatni atribut za pohranu formata slike

    igrac = relationship("Ekipa",back_populates="ekipa")
    korisnici = relationship("Korisnik", back_populates="igraci")
    recenzije_igraca = relationship("RecenzijaIgraca", back_populates= "igraci")
    sportovi = relationship("Veza_igrac_sport", back_populates="igraci")
    termini_u_pripremi = relationship("Event_u_pripremi", back_populates="organizator")
    event = relationship("Veza_igrac_termin_u_pripremi", back_populates="igrac")
    # eventZavrseni = relationship("Veza_igrac_termin_zavrseni", back_populates="igrac")
    ekipe = relationship("Veza_igrac_ekipa", back_populates="igrac")
