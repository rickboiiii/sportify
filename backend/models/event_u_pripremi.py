from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship

from backend.database import Base


class Event_u_pripremi(Base):
    __tablename__ = "eventi_u_pripremi"

    id_eventa = Column(Integer, primary_key=True, autoincrement=True)
    id_lokacije = Column(Integer, ForeignKey("lokacije.id_lokacije"))
    id_organizatora = Column(Integer, ForeignKey("igraci.id_igraca"))
    id_sporta = Column(Integer, ForeignKey("sportovi.id_sporta"))
    naziv_termina = Column(String, nullable=True, index=True)
    opis_termina = Column(String, nullable=True)
    vrsta_termina = Column(String, nullable=False)
    pocetak_termina = Column(DateTime)
    potreban_nivo_sposobnosti = Column(Integer)
    spol = Column(Boolean, nullable=True)
    minimalan_broj_igraca = Column(Integer)
    maksimalan_broj_igraca = Column(Integer)
    broj_slobodnih_mjesta = Column(Integer)
    popunjen = Column(Boolean, nullable=False)

    lokacije = relationship("Lokacija", back_populates="termini_u_pripremi")
    organizator = relationship("Igrac", back_populates="termini_u_pripremi")
    sport = relationship("Sifarnik_sportova", back_populates="termin_u_pripremi")
    igrac = relationship("Veza_igrac_termin_u_pripremi", back_populates="event")
    prijava = relationship("PrijavljeniKorisnici", back_populates="event")
