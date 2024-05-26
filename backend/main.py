from functools import lru_cache
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .config import Settings
from .dependencies import get_db

from .routers import users, profiles, auth

from .database import Base, SessionLocal, engine

from fastapi.middleware.cors import CORSMiddleware

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

    app.include_router(users.router)
    app.include_router(profiles.router)
    app.include_router(auth.router)

    return app

app = start_application()

@lru_cache
def get_settings():
    return Settings()

@app.get("/")
async def root():
    return "Landing Page goes here"
