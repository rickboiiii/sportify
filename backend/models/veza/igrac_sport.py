from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from backend.database import Base


class Veza_igrac_sport(Base):
    __tablename__ = "veze_igrac_sport"

    id_veze = Column(Integer, primary_key=True, autoincrement=True)
    id_igraca = Column(Integer, ForeignKey("igraci.id_igraca"))
    id_sporta = Column(Integer, ForeignKey("sportovi.id_sporta"))

    igraci = relationship("Igrac", back_populates="sportovi")
    sportovi = relationship("Sifarnik_sportova", back_populates="igraci")
