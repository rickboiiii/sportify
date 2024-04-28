from functools import lru_cache
from fastapi import FastAPI, Depends

from .config import Settings
from .dependencies import get_db

from .routers import users, profiles


app = FastAPI(dependencies=[Depends(get_db)])


@lru_cache
def get_settings():
    return Settings()


app.include_router(users.router)
app.include_router(profiles.router)


@app.get("/")
async def root():
    return "Landing Page goes here"
