from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from backend.database import Base


class Veza_igrac_ekipa(Base):
    __tablename__ = "veze_igrac_ekipa"

    id_veze = Column(Integer, primary_key=True, autoincrement=True)
    id_ekipe = Column(Integer, ForeignKey("ekipe.id_ekipe"))

    ekipe = relationship("Ekipa", back_populates="igrac")
    id_igraca = Column(Integer, ForeignKey("igraci.id_igraca"))
    igrac = relationship("Igrac", back_populates="ekipe")
