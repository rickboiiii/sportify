from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship

from backend.database import Base
class LostAndFound(Base):
    __tablename__ = 'lost_and_found'

    id_losta = Column(Integer, primary_key=True, index=True, autoincrement=True)
    tag = Column(String, nullable=False)
    opis = Column(String, nullable=False)
    id_lokacije = Column(Integer, ForeignKey('lokacije.id_lokacije'), nullable=False)
    slika = Column(String)

    
    lokacija = relationship("Lokacije", back_populates="lost_and_found_eventi") 