from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime  # Import datetime module

from backend.database import Base

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_chata = Column(Integer, ForeignKey("chats.id_chata"))
    from_user_id = Column(Integer, ForeignKey("korisnici.id_korisnika")) 
    to_user_id = Column(Integer, ForeignKey("korisnici.id_korisnika")) 
    message = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    chat = relationship("Chat", back_populates="messages")
    from_user = relationship("Korisnik", foreign_keys=[from_user_id])  
    to_user = relationship("Korisnik", foreign_keys=[to_user_id])     
