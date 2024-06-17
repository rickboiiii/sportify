from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from backend.database import Base


class Adresa(Base):
    __tablename__ = "adrese"

    id_adrese = Column(Integer, primary_key=True, autoincrement=True)
    naziv_ulice = Column(String, nullable=False)
    postanski_broj = Column(Integer, nullable=False, unique=True)
    grad = Column(String, nullable=False)
    drzava = Column(String, nullable=False)

    lokacije = relationship("Lokacija", back_populates="adrese")
