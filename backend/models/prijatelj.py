from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from backend.database import Base

class Prijatelj(Base):
    __tablename__ = "prijatelji"
    
    id_prijateljstva = Column(Integer, primary_key=True, autoincrement=True)
    id_prijatelja1 = Column(Integer, ForeignKey("korisnici.id_korisnika"))
    id_prijatelja2 = Column(Integer, ForeignKey("korisnici.id_korisnika"))
    
    korisnik1 = relationship("Korisnik", foreign_keys=[id_prijatelja1], back_populates="prijateljstva1")
    korisnik2 = relationship("Korisnik", foreign_keys=[id_prijatelja2], back_populates="prijateljstva2")