import os
from functools import lru_cache
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext

from .config import Settings
from .dependencies import get_db

from .routers import users, profiles

from .database import Base, SessionLocal, engine

from fastapi.middleware.cors import CORSMiddleware

from .models_singleton import Korisnik

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


def start_application():
    app = FastAPI(dependencies=[Depends(get_db)])
    Base.metadata.create_all(bind=engine)
    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app = start_application()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT stuff .. // Use .ENV and config.py settings WiP for JWT Function or class
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


@lru_cache
def get_settings():
    return Settings()


app.include_router(users.router)
app.include_router(profiles.router)



# Mount the React build directory as static files
app.mount("/static", StaticFiles(directory="frontend/.next/static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse("../frontend/.next/index.html")

# If you want to serve other routes in your React app, you might need to catch-all route:
@app.get("/{full_path:path}")
async def read_react_app(full_path: str):
    file_path = f"../frontend/.next/{full_path}"
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)
    return FileResponse("../frontend/.next/index.html")


# Autentifikacija korisnika
def authenticate_user(korisnicko_ime: str, sifra: str, db: Session):
    user = db.query(Korisnik).filter(Korisnik.korisnicko_ime == korisnicko_ime).first()
    if not user:
        return False
    if not pwd_context.verify(sifra, user.sifra):
        return False
    return user

# Kreiranje tokena
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.korisnicko_ime}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        korisnicko_ime: str = payload.get("sub")
        if korisnicko_ime is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        return payload
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")

@app.get("/verify-token/{token}")
async def verify_user_token(token: str):
    verify_token(token=token)
    return {"message": "Token is valid"}

