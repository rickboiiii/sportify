from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime  # Import datetime module

from backend.database import Base

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_chata = Column(Integer, ForeignKey("chats.id_chata"))
    from_user_id = Column(Integer, ForeignKey("igraci.id_igraca"))  # Corrected foreign key name
    to_user_id = Column(Integer, ForeignKey("igraci.id_igraca"))    # Corrected foreign key name
    message = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    chat = relationship("Chat", back_populates="messages")
    from_user = relationship("Igrac", foreign_keys=[from_user_id])  # Corrected relationship name
    to_user = relationship("Igrac", foreign_keys=[to_user_id])      # Corrected relationship name
