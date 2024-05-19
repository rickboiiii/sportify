from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from backend.database import Base


class RecenzijaIgraca(Base):
    __tablename__ = "recenzije_igraca"

    id_recenzije_igraca = Column(Integer, primary_key=True, autoincrement=True)
    id_igraca = Column(Integer, ForeignKey("igraci.id_igraca"))
    komentar = Column(String)
    ocjena = Column(Float)

    igraci = relationship("Igrac", back_populates="recenzije_igraca")
