from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.cruds import get_igraci, get_vlasnici, get_all_profiles, get_all_profiles_username, update_igrac, update_vlasnik, rate_igrac, upload_picture_igrac, upload_picture_vlasnik
from backend.cruds.profile import rate_vlasnik
from backend.dependencies import get_db

from backend.schemas import IgracProfil, VlasnikProfil, Profili, UserUpdateIgrac, UserUpdateVlasnik, \
    RecenzijaIgracaSchema, RecenzijaVlasnikaSchema, UploadPicture

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


@router.put("/profiles/igraci/id/{id_igraca}", tags=["profiles"])
async def update_profile_igraci(id_igraca: int, igrac_info: UserUpdateIgrac, db: Session = Depends(get_db)) -> IgracProfil | None:
    igrac = update_igrac(db, igrac_info, id_igraca)

    if igrac is None:
        raise HTTPException(status_code=404, detail=f"Profile Igraca:{id_igraca} not found")

    return igrac


@router.post("/profiles/igraci/id/{id_igraca}/rate", tags=["profiles"])
async def rate_profile_igraci(id_igraca: int, rating: RecenzijaIgracaSchema, db: Session = Depends(get_db)) -> IgracProfil:
    igrac = rate_igrac(db, rating, id_igraca)

    if igrac is None:
        raise HTTPException(status_code=404, detail=f"Profile Igraca:{id_igraca} not found")

    return igrac


@router.put("/profiles/igraci/upload_picture", tags=["profiles"])
async def upload_picture_igraci(img_data: UploadPicture, db: Session = Depends(get_db)) -> IgracProfil | None:
    igrac = upload_picture_igrac(db, img_data)

    if igrac is None:
        raise HTTPException(status_code=404, detail=f"Profile Igraca:{img_data.id} not found")

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


@router.put("/profiles/vlasnici/id/{id_vlasnika}", tags=["profiles"])
async def update_profile_vlasnici(id_vlasnika: int, vlasnik_info: UserUpdateVlasnik, db: Session = Depends(get_db)) -> VlasnikProfil | None:
    vlasnik = update_vlasnik(db, vlasnik_info, id_vlasnika)

    if vlasnik is None:
        raise HTTPException(status_code=404, detail=f"Profile Vlasnika:{id_vlasnika} not found")

    return vlasnik


@router.post("/profiles/vlasnici/id/{id_vlasnika}/rate", tags=["profiles"])
async def rate_profile_vlasnici(id_vlasnika: int, rating: RecenzijaVlasnikaSchema, db: Session = Depends(get_db)) -> VlasnikProfil:
    vlasnik = rate_vlasnik(db, rating, id_vlasnika)

    if vlasnik is None:
        raise HTTPException(status_code=404, detail=f"Profile Vlasnika:{id_vlasnika} not found")

    return vlasnik


@router.put("/profiles/vlasnici/upload_picture", tags=["profiles"])
async def upload_picture_vlasnici(img_data: UploadPicture, db: Session = Depends(get_db)) -> VlasnikProfil | None:
    vlasnik = upload_picture_vlasnik(db, img_data)

    if vlasnik is None:
        raise HTTPException(status_code=404, detail=f"Profile Vlasnika:{img_data.id} not found")

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
