from sqlalchemy.orm import Session

from ..models import users
from ..models import Korisnik
from ..schemas import user


def get_user(db: Session, user_id: int):
    return db.query(users.User).filter(users.User.id == user_id).first()


def get_users(db: Session):
    return db.query(users.User).all()


def create_user(db: Session, new_user: user.UserCreate):
    fake_hashed_password = new_user.password + "notreallyhashed"
    db_user = users.User(email=new_user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_username(db: Session, korisnicko_ime: str):
    return db.query(Korisnik).filter(Korisnik.korisnicko_ime == korisnicko_ime).first()
