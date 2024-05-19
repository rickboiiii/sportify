from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.cruds.profile import get_igraci, get_vlasnici, get_all_profiles, get_all_profiles_username
from backend.dependencies import get_db

from backend.schemas.profil import IgracProfil, VlasnikProfil, Profili

router = APIRouter()


@router.get("/profiles/", tags=["profiles"])
async def get_profiles(db: Session = Depends(get_db)) -> Profili:
    profiles = get_all_profiles(db)
    return profiles


@router.get("/profiles/igraci", tags=["profiles"])
async def get_profiles_igraci(db: Session = Depends(get_db)) -> list[IgracProfil]:
    igraci = get_igraci(db)
    return igraci


@router.get("/profiles/igraci/id/{id_igraca}", tags=["profiles"])
async def get_profile_id(id_igraca: int, db: Session = Depends(get_db)) -> IgracProfil | None:
    igrac = get_igraci(db, {"id_igraca": id_igraca, "first": True})

    if igrac is None:
        raise HTTPException(status_code=404, detail=f"Profile Igraca:{id_igraca} not found")

    return igrac


@router.get("/profiles/igraci/username/{username}", tags=["profiles"])
async def get_profile_username(username: str, db: Session = Depends(get_db)) -> IgracProfil | None:
    igrac = get_igraci(db, {"username": username, "first": True})

    if igrac is None:
        raise HTTPException(status_code=404, detail=f"Profile Igraca:{username} not found")

    return igrac


@router.get("/profiles/vlasnici", tags=["profiles"])
async def get_profiles_vlasnici(db: Session = Depends(get_db)) -> list[VlasnikProfil]:
    vlasnici = get_vlasnici(db)
    return vlasnici


@router.get("/profiles/vlasnici/id/{id_vlasnika}", tags=["profiles"])
async def get_profile_id(id_vlasnika: int, db: Session = Depends(get_db)) -> VlasnikProfil | None:
    vlasnik = get_vlasnici(db, {"id_vlasnika": id_vlasnika, "first": True})

    if vlasnik is None:
        raise HTTPException(status_code=404, detail=f"Profile Vlasnika:{id_vlasnika} not found")

    return vlasnik


@router.get("/profiles/vlasnici/username/{username}", tags=["profiles"])
async def get_profile_username(username: str, db: Session = Depends(get_db)) -> VlasnikProfil | None:
    vlasnik = get_vlasnici(db, {"username": username, "first": True})

    if vlasnik is None:
        raise HTTPException(status_code=404, detail=f"Profile Vlasnika:{username} not found")

    return vlasnik


@router.get("/profiles/username/{username}", tags=["profiles"])
async def get_profiles_username(username: str, db: Session = Depends(get_db)) -> Profili:
    profiles = get_all_profiles_username(username, db)
    return profiles
