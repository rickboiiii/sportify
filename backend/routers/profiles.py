from fastapi import APIRouter

router = APIRouter()


@router.get("/profiles/", tags=["profiles"])
async def get_profiles():
    return {"message": "All profiles"}


@router.get("/profiles/{username}", tags=["profiles"])
async def get_profile(username: str):
    return {"username": username}
