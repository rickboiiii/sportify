from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from backend.database import Base

from backend.models.sport import Sifarnik_sportova


class Ekipa(Base):
    __tablename__ = "ekipe"

    id_ekipe = Column(Integer, primary_key=True, autoincrement=True)
    naziv_ekipe = Column(String)
    id_sporta = Column(Integer, ForeignKey("sportovi.id_sporta"))

    sport = relationship("Sifarnik_sportova", back_populates="ekipe")
    igrac = relationship("Veza_igrac_ekipa", back_populates="ekipe")
    turnir = relationship("Veza_ekipa_turnir", back_populates="ekipa")
