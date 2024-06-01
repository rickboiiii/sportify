from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from backend.database import Base


class Ekipa(Base):
    __tablename__ = "ekipe"

    id_ekipe = Column(Integer, primary_key=True, autoincrement=True)
    naziv_ekipe = Column(String)
    id_sporta = Column(Integer, ForeignKey("sportovi.id_sporta"))
    broj_pobjeda = Column(Integer)
    broj_poraza = Column(Integer)
    kapiten=Column(Integer, ForeignKey("igraci.id_igraca"))


    ekipa = relationship("Igrac",back_populates="igrac")
    sport = relationship("Sifarnik_sportova", back_populates="ekipe")
    igrac = relationship("Veza_igrac_ekipa", back_populates="ekipe")
    turnir = relationship("Veza_ekipa_turnir", back_populates="ekipa")
