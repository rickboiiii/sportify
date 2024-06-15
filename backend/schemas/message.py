from pydantic import BaseModel
from datetime import datetime

class MessageSchema(BaseModel):
    id: int
    id_chata: int
    from_user_id: int
    to_user_id: int
    message: str
    timestamp: datetime

    class Config:
        from_attributes = True
