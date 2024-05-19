from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from backend.database import Base


class RecenzijaVlasnika(Base):
    __tablename__ = "recenzije_vlasnika"

    id_recenzije_vlasnika = Column(Integer, primary_key=True, autoincrement=True)
    id_vlasnika = Column(Integer, ForeignKey("vlasnici.id_vlasnika"))
    komentar = Column(String)
    ocjena = Column(Float)

    vlasnici = relationship("Vlasnik", back_populates="recenzije_vlasnika")
