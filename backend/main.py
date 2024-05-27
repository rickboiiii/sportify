import os
from functools import lru_cache
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .config import Settings
from .dependencies import get_db

from .routers import profiles, auth, forms

from .database import Base, SessionLocal, engine

from fastapi.middleware.cors import CORSMiddleware

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

    app.include_router(profiles.router)
    app.include_router(auth.router)
    app.include_router(forms.router)

    return app


app = start_application()

@lru_cache
def get_settings():
    return Settings()


# Mount the React build directory as static files
app.mount("/static", StaticFiles(directory="frontend/.next/static"), name="static")

# Unnecessary, Next loads differently than React
# @app.get("/")
# async def read_index():
#     return FileResponse("../frontend/.next/index.html")
#
# # If you want to serve other routes in your React app, you might need to catch-all route:
# @app.get("/{full_path:path}")
# async def read_react_app(full_path: str):
#     file_path = f"../frontend/.next/{full_path}"
#     if os.path.exists(file_path) and os.path.isfile(file_path):
#         return FileResponse(file_path)
#     return FileResponse("../frontend/.next/index.html")
