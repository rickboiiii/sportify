from typing import List, Union
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.cruds import get_igraci, get_vlasnici, get_all_users, get_all_profiles_username
from backend.dependencies import get_db

from backend.schemas import Users, IgracUser, VlasnikUser

router = APIRouter()


@router.get("/users/", response_model=List[Union[IgracUser, VlasnikUser]])
async def read_users(db: Session = Depends(get_db)):
    igraci = get_igraci(db)
    vlasnici = get_vlasnici(db)
    all_users = igraci + vlasnici
    return all_users


@router.get("/users/igraci", tags=["users"])
async def get_users_igraci(db: Session = Depends(get_db)) -> list[IgracUser]:
    igraci = get_igraci(db)
    return igraci


@router.get("/users/igraci/id/{id_igraca}", tags=["users"])
async def get_users_id(id_igraca: int, db: Session = Depends(get_db)) -> IgracUser | None:
    igrac = get_igraci(db, {"id_igraca": id_igraca, "first": True})

    if igrac is None:
        raise HTTPException(status_code=404, detail=f"users Igraca:{id_igraca} not found")

    return igrac


@router.get("/users/vlasnici", tags=["users"])
async def get_users_vlasnici(db: Session = Depends(get_db)) -> list[VlasnikUser]:
    vlasnici = get_vlasnici(db)
    return vlasnici


@router.get("/users/vlasnici/id/{id_vlasnika}", tags=["users"])
async def get_users_id(id_vlasnika: int, db: Session = Depends(get_db)) -> VlasnikUser | None:
    vlasnik = get_vlasnici(db, {"id_vlasnika": id_vlasnika, "first": True})

    if vlasnik is None:
        raise HTTPException(status_code=404, detail=f"users Vlasnika:{id_vlasnika} not found")

    return vlasnik


@router.get("/users/vlasnici/username/{username}", tags=["users"])
async def get_users_username(username: str, db: Session = Depends(get_db)) -> VlasnikUser | None:
    vlasnik = get_vlasnici(db, {"username": username, "first": True})

    if vlasnik is None:
        raise HTTPException(status_code=404, detail=f"User Vlasnik:{username} not found")

    return vlasnik


@router.get("/users/username/{username}", tags=["users"])
async def get_users_username(username: str, db: Session = Depends(get_db)) -> Users:
    users = get_all_profiles_username(username, db)
    return users
