from sqlalchemy import Column, ForeignKey, Integer, Float, CheckConstraint
from sqlalchemy.orm import relationship

from backend.database import Base


class Lokacija(Base):
    __tablename__ = "lokacije"

    id_lokacije = Column(Integer, primary_key=True, autoincrement=True)
    id_vlasnika = Column(Integer, ForeignKey("vlasnici.id_vlasnika"))
    id_adrese = Column(Integer, ForeignKey("adrese.id_adrese"))
    recenzija = Column(Float, CheckConstraint("recenzija>=1 and recenzija<=5"))
    cijena_po_terminu = Column(Float, CheckConstraint("cijena_po_terminu>0 or cijena_po_terminu is null"), nullable=True)

    vlasnici = relationship("Vlasnik", back_populates="lokacije")
    adrese = relationship("Adresa", back_populates="lokacija")
    sportovi = relationship("Veza_lokacija_sport", back_populates="lokacije")
    recenzija_terena = relationship("RecenzijaTerena", back_populates="tereni")
    slobodni_termini = relationship("Slobodni_Event", back_populates="lokacije")
    termini_u_pripremi = relationship("Event_u_pripremi", back_populates="lokacije")
    turnir = relationship("Turnir", back_populates="lokacija")
