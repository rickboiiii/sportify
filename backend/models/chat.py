from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Float, CheckConstraint
from sqlalchemy.orm import relationship

from backend.database import Base

class Chat(Base):
    __tablename__ = "chats"

    id_chata = Column(Integer, primary_key=True, autoincrement=True)
    id_user1 = Column(Integer, ForeignKey("korisnici.id_korisnika"))
    id_user2 = Column(Integer, ForeignKey("korisnici.id_korisnika"))

    user1 = relationship("Korisnik", foreign_keys=[id_user1])  
    user2 = relationship("Korisnik", foreign_keys=[id_user2]) 
    messages = relationship("Message", back_populates="chat")