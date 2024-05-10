from fastapi import APIRouter
from ..schemas.user import User


router = APIRouter()


@router.get("/users/", tags=["users"])
async def get_users():
    return {"message": "All users"}


@router.post("/users/", tags=["users"])
async def create_user(user: User):
    return {"message": "User created"}


@router.get("/users/{username}", tags=["users"])
async def get_user(username: str):
    return {"username": username}


@router.put("/users/{user_id}", tags=["users"])
async def update_user(user_id: int, user: User):
    return {"message": "User updated"}


@router.delete("/users/{user_id}", tags=["users"])
async def delete_user(user_id: int):
    return {"message": "User deleted"}
