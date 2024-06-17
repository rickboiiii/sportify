from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from backend.database import Base

class PrijavljeniKorisnici(Base):
    __tablename__ = 'prijavljeni_korisnici'

    id_prijave = Column(Integer, primary_key=True, autoincrement=True)
    id_eventa = Column(Integer, ForeignKey('eventi_u_pripremi.id_eventa'))
    id_korisnika = Column(Integer, ForeignKey('korisnici.id_korisnika'))

    event = relationship("Event_u_pripremi", back_populates="prijava")
    user = relationship("Korisnik", back_populates="prijava")
