from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException, Request, Query
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from typing import List, Dict
from collections import defaultdict
import logging
from backend.config import Settings
from backend.dependencies import get_db

from backend.models import Korisnik, Chat, Message
from backend.schemas import Users, ChatSchema, MessageSchema

router = APIRouter()

settings = Settings()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
logging.basicConfig(level=logging.INFO)


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.messages = defaultdict(list)

    async def connect(self, websocket: WebSocket, id_igraca: int):
        await websocket.accept()
        self.active_connections[str(id_igraca)] = websocket

    def disconnect(self, id_igraca: int):
        id_str = str(id_igraca)
        if id_str in self.active_connections:
            del self.active_connections[id_str]

    async def send_message(self, websocket: WebSocket, message: dict):
        await websocket.send_json(message)

    async def send_message_to_user(self, recipient: int, message: dict):
        websocket = self.active_connections.get(recipient)
        if websocket:
            await self.send_message(websocket, message)

    async def broadcast(self, message: dict):
        for connection in self.active_connections.values():
            await self.send_message(connection, message)

    async def save_message(self, from_user: int, to_user: int, message: str):
        db=next(get_db())
        chat = (
            db.query(Chat)
            .filter(
                ((Chat.id_user1 == from_user) & (Chat.id_user2 == to_user)) |
                ((Chat.id_user1 == to_user) & (Chat.id_user2 == from_user))
            )
            .first()
        )
        if not chat:
            chat = Chat(id_user1=from_user, id_user2=to_user)
            db.add(chat)
            db.commit()
            db.refresh(chat)

        db_message = Message(id_chata=chat.id_chata, from_user_id=from_user, to_user_id=to_user,message=message)
        db.add(db_message)
        db.commit()
        db.refresh(db_message)

manager = ConnectionManager()

def get_user_id(token: str, db: Session):
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        korisnicko_ime: str = payload.get("sub")
        if korisnicko_ime is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = db.query(Korisnik).filter(Korisnik.korisnicko_ime == korisnicko_ime).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return user.id_korisnika
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/get_id/{token}", tags=["user"])
async def get_id(token: str):
    db = next(get_db())
    user_id = get_user_id(token, db)
    return user_id

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    try:
        token = websocket.cookies.get("token")
        if not token:
            raise HTTPException(status_code=401, detail="Missing token")
       
        id_igraca = await get_id(token)
        if not id_igraca:
            await websocket.close(code=1008)
            return

        await manager.connect(websocket, id_igraca)
        try:
            while True:
                data = await websocket.receive_json()
                from_user = id_igraca
                to_user = data.get("to")
                message = data.get("message")
                
                if not to_user or not message:
                    continue
                
                message_data = {
                    "from": from_user,
                    "to": to_user,
                    "message": message
                }
                
                await manager.send_message_to_user(to_user, message_data)
                await manager.save_message(from_user, to_user, message)
        except WebSocketDisconnect:
            manager.disconnect(id_igraca)
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        await websocket.close(code=1011)

@router.post("/messages")
async def save_message(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    from_user = data.get("from")
    to_user = data.get("to")
    message = data.get("message")
    
    if not from_user or not to_user or not message:
        raise HTTPException(status_code=400, detail="Invalid message data")
    
    try:
        await manager.save_message(from_user, to_user, message)
        return {"status": "Message saved"}
    except Exception as error:
        logging.error(f"Error saving message: {error}")
        raise HTTPException(status_code=500, detail="Failed to save message")

@router.get("/messages", response_model=List[MessageSchema], tags=["messages"])
async def get_messages(id_user1: int = Query(...), id_user2: int = Query(...), db: Session = Depends(get_db)):
    try:
        messages = db.query(Message).filter(
            ((Message.from_user_id == id_user1) & (Message.to_user_id == id_user2)) |
            ((Message.from_user_id == id_user2) & (Message.to_user_id == id_user1))
        ).all()

        return messages
    except Exception as e:
        logging.error(f"Error retrieving messages: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve messages")
    
@router.get("/chats/{user_id}", response_model=List[ChatSchema], tags=["chats"])
async def get_chats_by_user(user_id: int, db: Session = Depends(get_db)):
    try:
        chats = db.query(Chat).filter(
            (Chat.id_user1 == user_id) | (Chat.id_user2 == user_id)
        ).all()

        if not chats:
            raise HTTPException(status_code=404, detail="No chats found for this user")
        return chats
    except Exception as e:
        logging.error(f"Error retrieving chats: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve chats")