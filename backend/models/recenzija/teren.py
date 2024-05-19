from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from backend.database import Base


class RecenzijaTerena(Base):
    __tablename__ = "recenzije_terena"

    id_recenzije_terena = Column(Integer, primary_key=True, autoincrement=True)
    id_terena = Column(Integer, ForeignKey("lokacije.id_lokacije"))
    komentar = Column(String)
    ocjena = Column(Float)

    tereni = relationship("Lokacija", back_populates="recenzija_terena")
