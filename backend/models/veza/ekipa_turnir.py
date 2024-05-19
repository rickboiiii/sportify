from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from backend.database import Base


class Veza_ekipa_turnir(Base):
    __tablename__ = "veze_ekipa_turnir"

    id_veze = Column(Integer, primary_key=True, autoincrement=True)
    id_ekipe = Column(Integer, ForeignKey("ekipe.id_ekipe"))
    id_turnira = Column(Integer, ForeignKey("turniri.id_turnira"))

    ekipa = relationship("Ekipa", back_populates="turnir")
    turnir = relationship("Turnir", back_populates="ekipa")
