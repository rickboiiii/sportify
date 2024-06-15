from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class PrijavljeniKorisnici(Base):
    __tablename__ = 'prijavljeni_korisnici'

    id_prijave = Column(Integer, primary_key=True, autoincrement=True)
    id_eventa = Column(Integer, ForeignKey('events.id_eventa'))
    id_korisnika = Column(Integer, ForeignKey('users.id_korisnika'))

    event = relationship("Event_u_pripremi", backref="prijavljeni_korisnici")
    user = relationship("Korisnik", backref="prijavljeni_korisnici")
