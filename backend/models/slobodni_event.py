from sqlalchemy import Column, ForeignKey, Integer, DateTime
from sqlalchemy.orm import relationship

from backend.database import Base


class Slobodni_Event(Base):
    __tablename__ = "slobodni_eventi"

    id_eventa = Column(Integer, primary_key=True, autoincrement=True)
    id_lokacije = Column(Integer, ForeignKey("lokacije.id_lokacije"))
    pocetak_termina = Column(DateTime, nullable=False)
    kraj_termina = Column(DateTime, nullable=False)

    lokacije = relationship("Lokacija", back_populates="slobodni_termini")
