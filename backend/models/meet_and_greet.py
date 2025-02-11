from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship

from backend.database import Base

class MeetAndGreet(Base):
    __tablename__ = "meet_and_greet"

    id_meeta = Column(Integer, primary_key=True, index=True, autoincrement=True)
    kapacitet = Column(Integer, nullable=False)
    id_sporta = Column(Integer, ForeignKey('sportovi.id_sporta'), nullable=False)
    id_lokacije = Column(Integer, ForeignKey('lokacije.id_lokacije'), nullable=False)
    datum_odrzavanja = Column(DateTime)
    naziv_okupljanja = Column(String)
    opis_okupljanja= Column(String)

    sport = relationship("Sifarnik_sportova", back_populates="meet_and_greet_eventi")
    lokacije = relationship("Lokacija", back_populates="meet_and_greet_eventi") 


