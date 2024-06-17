from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from backend.database import Base


class Turnir(Base):
    __tablename__ = "turniri"

    id_turnira = Column(Integer, primary_key=True, autoincrement=True)
    naziv_turnira = Column(String)
    kotizacija = Column(Integer)
    organizator = Column(Integer, ForeignKey("igraci.id_igraca"))
    id_sporta = Column(Integer, ForeignKey("sportovi.id_sporta"))
    id_lokacije = Column(Integer, ForeignKey("lokacije.id_lokacije"))

    sport = relationship("Sifarnik_sportova", back_populates="turnir")
    lokacije = relationship("Lokacija", back_populates="turnir")
    ekipa = relationship("Veza_ekipa_turnir", back_populates="turnir")
