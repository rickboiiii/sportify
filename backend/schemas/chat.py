from pydantic import BaseModel

class ChatSchema(BaseModel):
    id_chata: int
    id_user1: int
    id_user2: int

    class Config:
        orm_mode = True
