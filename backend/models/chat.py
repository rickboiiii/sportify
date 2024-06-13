from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Float, CheckConstraint
from sqlalchemy.orm import relationship

from backend.database import Base

class Chat(Base):
    __tablename__ = "chats"

    id_chata = Column(Integer, primary_key=True, autoincrement=True)
    id_user1 = Column(Integer, ForeignKey("igraci.id_igraca"))
    id_user2 = Column(Integer, ForeignKey("igraci.id_igraca"))

    user1 = relationship("Igrac", foreign_keys=[id_user1])  # Corrected relationship name
    user2 = relationship("Igrac", foreign_keys=[id_user2])  # Corrected relationship name
    messages = relationship("Message", back_populates="chat")