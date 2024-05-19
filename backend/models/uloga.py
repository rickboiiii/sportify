from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from backend.database import Base


class Uloga(Base):
    __tablename__ = "uloge"

    # id_uloge 1-igrac, 2-vlasnik, 3-oboje
    id_uloge = Column(Integer, primary_key=True, autoincrement=True)
    naziv_uloge = Column(String)
    # id_korisnika = Column(Integer, ForeignKey("korisnici.id_korisnika"))

    korisnici = relationship("Korisnik", back_populates="uloga")
