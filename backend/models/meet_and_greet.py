from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship

from backend.database import Base

class MeetAndGreet(Base):
    __tablename__ = "meet_and_greet"

    id_meeta = Column(Integer, primary_key=True, index=True, autoincrement=True)
    kapacitet = Column(Integer, nullable=False)
    id_sporta = Column(Integer, ForeignKey('sport.id_sporta'), nullable=False)
    id_lokacije = Column(Integer, ForeignKey('lokacije.id_lokacije'), nullable=False)
    datum_odrzavanja = Column(DateTime, nullable=False)
    naziv_okupljanja = Column(String)
    opis_okupljanja= Column(String)

    sport = relationship("Sport", back_populates="meet_and_greet_eventi")
    lokacija = relationship("Lokacije", back_populates="meet_and_greet_eventi") 