import os
from functools import lru_cache
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .models import Korisnik, Sifarnik_sportova, Igrac, Veza_igrac_sport, Vlasnik, Ekipa
from .routers.auth import pwd_context
from .schemas import KorisnikSchema2, IgracSchema, VlasnikSchema, SportistaSport, EkipaSport
from sqlalchemy import desc, func, Numeric, alias, TableValuedAlias
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

@app.get("/register/validUsername/{username}")
async def postojiUsername( username:str, db:Session= Depends(get_db)):
    print(username)
    user = db.query(Korisnik).filter(Korisnik.korisnicko_ime==username).first()
    print(user)
    if user is None:
        return 0
    else:
        return 1

@app.post("/dodajKorisnika")
async def dodaj(korisnik:KorisnikSchema2, db:Session = Depends(get_db)):
    new_password = pwd_context.hash(korisnik.sifra)
    novi_korisnik=Korisnik(email=korisnik.email, sifra=new_password, korisnicko_ime=korisnik.korisnicko_ime, id_uloge=korisnik.uloga)
#         id_adrese_trenutni=id.id_adrese
#         new_lokacija = Lokacija(id_adrese=id_adrese_trenutni,recenzija=request.ocjena)

    db.add(novi_korisnik)
    db.commit()

    db.refresh(novi_korisnik)

    return novi_korisnik

@app.get("/sportovi")
async def sportovi(db:Session=Depends(get_db)):
    return db.query(Sifarnik_sportova).all()

@app.post("/dodajSportistu")
async def dodaj(korisnik:IgracSchema, db:Session = Depends(get_db)):
    novi_korisnik=Igrac(id_korisnika=korisnik.id_korisnika, ime_igraca=korisnik.ime_igraca, prezime_igraca=korisnik.prezime_igraca, datum_rodjenja=korisnik.datum_rodjenja, spol=korisnik.spol,visina=korisnik.visina, tezina=korisnik.tezina, max_dozvoljena_udaljenost=korisnik.max_dozvoljena_udaljenost)
   # nova_veza=Veza_igrac_sport()
#         id_adrese_trenutni=id.id_adrese
#         new_lokacija = Lokacija(id_adrese=id_adrese_trenutni,recenzija=request.ocjena)

    db.add(novi_korisnik)
    db.commit()

    db.refresh(novi_korisnik)

    return novi_korisnik
@app.post("/dodajVlasnika")
async def dodaj(korisnik:VlasnikSchema, db:Session = Depends(get_db)):
    novi_korisnik=Vlasnik(id_korisnika=korisnik.id_korisnika, ime_vlasnika=korisnik.ime_vlasnika, prezime_vlasnika=korisnik.prezime_vlasnika, datum_rodjenja=korisnik.datum_rodjenja, spol=korisnik.spol)
   # nova_veza=Veza_igrac_sport()
#         id_adrese_trenutni=id.id_adrese
#         new_lokacija = Lokacija(id_adrese=id_adrese_trenutni,recenzija=request.ocjena)

    db.add(novi_korisnik)
    db.commit()

    db.refresh(novi_korisnik)

    return novi_korisnik
@app.post("/dodajOboje")
async def dodaj(korisnik:IgracSchema, db:Session = Depends(get_db)):
    novi_korisnik=Igrac(id_korisnika=korisnik.id_korisnika, ime_igraca=korisnik.ime_igraca, prezime_igraca=korisnik.prezime_igraca, datum_rodjenja=korisnik.datum_rodjenja, spol=korisnik.spol,visina=korisnik.visina, tezina=korisnik.tezina, max_dozvoljena_udaljenost=korisnik.max_dozvoljena_udaljenost)
    novi_vlasnik=Vlasnik(id_korisnika=korisnik.id_korisnika, ime_vlasnika=korisnik.ime_igraca, prezime_vlasnika=korisnik.prezime_igraca, datum_rodjenja=korisnik.datum_rodjenja, spol=korisnik.spol)

   # nova_veza=Veza_igrac_sport()
#         id_adrese_trenutni=id.id_adrese
#         new_lokacija = Lokacija(id_adrese=id_adrese_trenutni,recenzija=request.ocjena)

    db.add(novi_korisnik)
    db.commit()
    db.add(novi_vlasnik)
    db.commit()

    db.refresh(novi_korisnik)
    db.refresh(novi_vlasnik)

    return novi_korisnik


@app.get("/dajNajboljePoSportu/{id}/{brojIgraca}")
async def sport(id:int,brojIgraca:int, db:Session=Depends(get_db)):
    subquery1 = db.query(
        Veza_igrac_sport.id_sporta,
        Igrac.ime_igraca,
        Igrac.prezime_igraca,
        Igrac.recenzija
    ).join(Veza_igrac_sport, Veza_igrac_sport.id_igraca == Igrac.id_igraca).order_by(desc(Igrac.recenzija)).subquery("upit2")

    subquery2 = db.query(
        Sifarnik_sportova.naziv_sporta,
        Sifarnik_sportova.id_sporta
    ).filter(Sifarnik_sportova.id_sporta == id).subquery("upit1")

    query = db.query(
        subquery2.c.naziv_sporta,
        subquery1.c.ime_igraca,
        subquery1.c.prezime_igraca,
        subquery1.c.recenzija
    ).join(subquery1, subquery2.c.id_sporta == subquery1.c.id_sporta)

    results = query.limit(brojIgraca).all()
    return  [SportistaSport(naziv_sporta=row.naziv_sporta, ime=row.ime_igraca, prezime=row.prezime_igraca, rating=row.recenzija) for row in results]


@app.get("/dajNajboljeEkipePoSportu/{id}/{brojIgraca}")
async def sport(id:int,brojIgraca:int, db:Session=Depends(get_db)):
    subquery= db.query(
    Ekipa.naziv_ekipe,
    Sifarnik_sportova.naziv_sporta,
    Ekipa.broj_pobjeda,
    Ekipa.broj_poraza
    ).join(Sifarnik_sportova, Sifarnik_sportova.id_sporta == Ekipa.id_sporta).order_by(desc(Ekipa.broj_pobjeda/(Ekipa.broj_pobjeda+Ekipa.broj_poraza))).limit(brojIgraca).all()
    return [EkipaSport(naziv_sporta=row.naziv_sporta, ime=row.naziv_ekipe, winrate=row.broj_pobjeda/(row.broj_pobjeda+row.broj_poraza)) for row in subquery]

@app.put("/dodajSposobnost/{sposobnost}/{id}")
async def sport(sposobnost:float, id:int, db:Session=Depends(get_db)):
    x=""
    if (sposobnost<0.33):
        x="Beginner"

    elif (sposobnost<0.66):
        x="Intermediate"
    else:
        x="Pro"

    db_igrac = db.query(Igrac).filter(Igrac.id_igraca == id).first()
    if db_igrac:
        db_igrac.nivo_sposobnosti = x
        db.commit()

