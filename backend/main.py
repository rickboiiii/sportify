
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"Hello": "World"}
@app.get("/proba")
async def root():
    return {"Hello svijete"}
