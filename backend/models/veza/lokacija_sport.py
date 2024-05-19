from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from backend.database import Base

from backend.models.lokacija import Lokacija


class Veza_lokacija_sport(Base):
    __tablename__ = "veze_lokacije_sport"

    id_veze = Column(Integer, primary_key=True, autoincrement=True)
    id_lokacije = Column(Integer, ForeignKey("lokacije.id_lokacije"))
    id_sporta = Column(Integer, ForeignKey("sportovi.id_sporta"))

    lokacije = relationship("Lokacija", back_populates="sportovi")
    sportovi = relationship("Sifarnik_sportova", back_populates="lokacije")
