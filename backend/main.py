import os
from functools import lru_cache
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .models import Korisnik, Sifarnik_sportova, Igrac, Veza_igrac_sport, Vlasnik, Ekipa, Event_u_pripremi, Lokacija
from .models.prijatelj import Prijatelj
from .models.objava import Objava
from .routers.auth import pwd_context
from .schemas import KorisnikSchema2, IgracSchema, VlasnikSchema, SportistaSport, EkipaSport
from .schema import Oglas, ObjavaSchema
from sqlalchemy import desc, func, Numeric, alias, TableValuedAlias, asc
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
# app.mount("/static", StaticFiles(directory="frontend/.next/static"), name="static")

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

@app.delete("/obrisiSportistu/{id}")
async def obrisi(id:int, db:Session=Depends(get_db) ) :
    sportista=db.query(Igrac).filter(Igrac.id_igraca==id).first()
    korisnik=db.query(Korisnik).filter(Korisnik.id_korisnika==sportista.id_korisnika).first()
    if sportista:
        db.delete(sportista)
        db.commit() 
        db.delete(korisnik)
        db.commit()   
        return {"detail": "User deleted successfully"}  
    else:
        return {"detail": "User nije obrisan"}

@app.get("/dajFiltriraneOglase/{id_sporta}/{nivo}/{spol}")
async def eventi(id_sporta:int, nivo:str, spol:int, db:Session=Depends(get_db)):
    spol_bool=2
    if (spol==0):
        spol_bool=False
    elif (spol==1):
        spol_bool=True
    # if (spol_bool!=2):
    #     if(nivo!="svi"):
    #         if(id_sporta!=0):
    #             result=db.query(Event_u_pripremi).filter(Event_u_pripremi.spol==spol_bool, Event_u_pripremi.potreban_nivo_sposobnosti==nivo, Event_u_pripremi.id_sporta==id_sporta)   
    #         else:
    #              result=db.query(Event_u_pripremi).filter(Event_u_pripremi.spol==spol_bool, Event_u_pripremi.potreban_nivo_sposobnosti==nivo)

    #     else:
    #         if(id_sporta!=0):
    #             result=db.query(Event_u_pripremi).filter(Event_u_pripremi.spol==spol_bool, Event_u_pripremi.id_sporta==id_sporta)   
    #         else:
    #              result=db.query(Event_u_pripremi).filter(Event_u_pripremi.spol==spol_bool)
    # else:
    #     if(nivo!="svi"):
    #         if(id_sporta!=0):
    #             result=db.query(Event_u_pripremi).filter( Event_u_pripremi.potreban_nivo_sposobnosti==nivo, Event_u_pripremi.id_sporta==id_sporta)  
    #         else:
    #              result=db.query(Event_u_pripremi).filter( Event_u_pripremi.potreban_nivo_sposobnosti==nivo)

    #     else:
    #         if(id_sporta!=0):
    #             result=db.query(Event_u_pripremi).filter( Event_u_pripremi.id_sporta==id_sporta)  
    #         else:
    #              result=db.query(Event_u_pripremi)
    result= db.query(Event_u_pripremi)
    if (id_sporta!=0):
        result=result.filter(Event_u_pripremi.id_sporta==id_sporta)
    if (nivo!="svi"):
        result=result.filter(Event_u_pripremi.potreban_nivo_sposobnosti==nivo)
    if(spol_bool!=2):
        result=result.filter(Event_u_pripremi.spol==spol_bool)
    result=result.join(Igrac, Event_u_pripremi.id_organizatora==Igrac.id_igraca).join(Lokacija, Event_u_pripremi.id_lokacije==Lokacija.id_lokacije)\
    .join(Sifarnik_sportova, Event_u_pripremi.id_sporta==Sifarnik_sportova.id_sporta).order_by(asc(Event_u_pripremi.pocetak_termina))\
        .add_columns(Igrac.ime_igraca, Igrac.srednje_ime, Igrac.prezime_igraca,Igrac.srednje_ime, Sifarnik_sportova.naziv_sporta, Lokacija.longituda, Lokacija.latituda, Event_u_pripremi.naziv_termina, Event_u_pripremi.opis_termina,Event_u_pripremi.pocetak_termina, Event_u_pripremi.broj_slobodnih_mjesta ).all()   
    #[SportistaSport(naziv_sporta=row.naziv_sporta, ime=row.ime_igraca, prezime=row.prezime_igraca, rating=row.recenzija) for row in results]         
    return [Oglas(ime_igraca=row.ime_igraca,prezime_igraca= row.prezime_igraca,srednje_ime=row.srednje_ime ,naziv_sporta=row.naziv_sporta, longituda=row.longituda, latituda=row.latituda,naziv_termina=row.naziv_termina,opis_termina=row.opis_termina , pocetak_termina=row.pocetak_termina ,broj_slobodnih_mjesta=row.broj_slobodnih_mjesta ) for row in result]       

@app.post("/testPrijateljstva/{id1}/{id2}")
async def dodaj(id1:int, id2:int, db:Session=Depends(get_db) ):
    novo_prijateljstvo=Prijatelj(id_prijatelja1=id1, id_prijatelja2=id2)
    db.add(novo_prijateljstvo)
    db.commit()

    db.refresh(novo_prijateljstvo)

@app.get("/dajObjavePrijatelja/{id}")
async def objave(id:int, db:Session=Depends(get_db)):
    result= db.query(Prijatelj).filter(Prijatelj.id_prijatelja1==id)\
   .join(Objava, Prijatelj.id_prijatelja2==Objava.id_korisnika).join(Korisnik, Korisnik.id_korisnika==Prijatelj.id_prijatelja2).\
    add_columns(Prijatelj.id_prijatelja2, Objava.tekst_objave, Korisnik.korisnicko_ime).all()
    return [ObjavaSchema(id_korisnika=row.id_prijatelja2, tekst_objave=row.tekst_objave, korisnicko_ime=row.korisnicko_ime) for row in result]
    


# @app.get("/events-in-preparation/")
# def get_events_in_preparation(db: Session = Depends(database.get_db)):
#     result = db.query(models.Event_u_pripremi)\
#                .join(models.Event, models.Event_u_pripremi.id_eventa == models.Event.id)\
#                .join(models.Igrac, models.Event.id_igraca == models.Igrac.id)\
#                .join(models.Lokacija, models.Event.id_lokacije == models.Lokacija.id)\
#                .add_columns(models.Igrac.ime, models.Igrac.prezime, models.Event.naziv, models.Lokacija.naziv.label("lokacija_naziv"))\
#                .all()
#     return result

@app.get("/pretraziPrijatelje/{id}/{username}/{svi}")
async def pretrazi_username(id: int, username: str,svi:bool, db: Session = Depends(get_db)):

    id_korisnika=db.query(Korisnik.id_korisnika).join(Igrac, Igrac.id_korisnika==Korisnik.id_korisnika).first()
    if (svi==True):
        return db.query(Korisnik).join(Prijatelj, Korisnik.id_korisnika == Prijatelj.id_prijatelja2)\
        .filter(Prijatelj.id_prijatelja1 == id_korisnika[0]).all() 
    return db.query(Korisnik).join(Prijatelj, Korisnik.id_korisnika == Prijatelj.id_prijatelja2)\
        .filter(Prijatelj.id_prijatelja1 == id_korisnika[0], Korisnik.korisnicko_ime.like(f"{username}%")).all()
 #Igrac.ime.like(f"{ime}%")