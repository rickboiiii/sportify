from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from backend.database import Base


class Veza_igrac_termin_u_pripremi(Base):
    __tablename__ = "veze_igrac_termin_u_pripremi"

    id_veze = Column(Integer, primary_key=True, autoincrement=True)
    id_igraca = Column(Integer, ForeignKey("igraci.id_igraca"))
    id_eventa = Column(Integer, ForeignKey("eventi_u_pripremi.id_eventa"))

    igrac = relationship("Igrac", back_populates="event")
    event = relationship("Event_u_pripremi", back_populates="igrac")
