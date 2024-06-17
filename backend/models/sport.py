from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from backend.database import Base


class Sifarnik_sportova(Base):
    __tablename__ = "sportovi"

    id_sporta = Column(Integer, primary_key=True, autoincrement=True)
    naziv_sporta = Column(String, nullable=False)
    broj_igraca = Column(Integer, nullable=False)
    zatvorenog_tipa = Column(Boolean, nullable=False)

    igraci = relationship("Veza_igrac_sport", back_populates="sportovi")
    lokacije = relationship("Veza_lokacija_sport", back_populates="sportovi")
    termin_u_pripremi = relationship("Event_u_pripremi", back_populates="sport")
    ekipe = relationship("Ekipa", back_populates="sport")
    turnir = relationship("Turnir", back_populates="sport")
    meet_and_greet_eventi = relationship("MeetAndGreet", back_populates="sport")
    
