from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from backend.models import Korisnik,Veza_igrac_ekipa, Sifarnik_sportova, Igrac, Veza_igrac_sport, Vlasnik, Ekipa, Event_u_pripremi, Lokacija, Adresa, Veza_lokacija_sport
from backend.models.prijatelj import Prijatelj
from backend.models.objava import Objava
from backend.routers.auth import pwd_context
from backend.schemas import KorisnikSchema2, IgracSchema, VlasnikSchema, SportistaSport, EkipaSport, ObjavaSchema, Oglas,EkipaSchema, EkipaSaClanovimaSchema, AdresaSchema, LokacijaSchema
from sqlalchemy import desc, func, asc, or_
from backend.dependencies import get_db


router = APIRouter()


@router.get("/register/validUsername/{username}")
async def postojiUsername( username:str, db:Session= Depends(get_db)):
    print(username)
    user = db.query(Korisnik).filter(Korisnik.korisnicko_ime==username).first()
    print(user)
    if user is None:
        return 0
    else:
        return 1


@router.post("/dodajKorisnika")
async def dodaj(korisnik:KorisnikSchema2, db:Session = Depends(get_db)):
    new_password = pwd_context.hash(korisnik.sifra)
    novi_korisnik=Korisnik(email=korisnik.email, sifra=new_password, korisnicko_ime=korisnik.korisnicko_ime, id_uloge=korisnik.uloga)
#         id_adrese_trenutni=id.id_adrese
#         new_lokacija = Lokacija(id_adrese=id_adrese_trenutni,recenzija=request.ocjena)

    db.add(novi_korisnik)
    db.commit()

    db.refresh(novi_korisnik)

    return novi_korisnik


@router.get("/sportovi")
async def sportovi(db:Session=Depends(get_db)):
    return db.query(Sifarnik_sportova).all()


@router.post("/dodajSportistu")
async def dodaj(korisnik:IgracSchema, db:Session = Depends(get_db)):
    novi_korisnik=Igrac(id_korisnika=korisnik.id_korisnika, ime_igraca=korisnik.ime_igraca, prezime_igraca=korisnik.prezime_igraca, datum_rodjenja=korisnik.datum_rodjenja, spol=korisnik.spol,visina=korisnik.visina, tezina=korisnik.tezina, max_dozvoljena_udaljenost=korisnik.max_dozvoljena_udaljenost)
   
#         id_adrese_trenutni=id.id_adrese
#         new_lokacija = Lokacija(id_adrese=id_adrese_trenutni,recenzija=request.ocjena)

    db.add(novi_korisnik)
    db.commit()

    nova_veza=Veza_igrac_sport(id_igraca=novi_korisnik.id_igraca, id_sporta=korisnik.sport)
    db.add(nova_veza)
    db.commit()
    db.refresh(novi_korisnik)
    return novi_korisnik


@router.post("/dodajVlasnika")
async def dodaj(korisnik:VlasnikSchema, db:Session = Depends(get_db)):
    novi_korisnik=Vlasnik(id_korisnika=korisnik.id_korisnika, ime_vlasnika=korisnik.ime_vlasnika, prezime_vlasnika=korisnik.prezime_vlasnika, datum_rodjenja=korisnik.datum_rodjenja, spol=korisnik.spol)
   

    db.add(novi_korisnik)
    db.commit()

    db.refresh(novi_korisnik)

    return novi_korisnik


@router.post("/dodajOboje")
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
    #nove linije
    nova_veza=Veza_igrac_sport(id_igraca=novi_korisnik.id_igraca, id_sporta=korisnik.sport)
    db.add(nova_veza)
    db.commit()
    #
    db.refresh(novi_korisnik)
    db.refresh(novi_vlasnik)

    return novi_korisnik


@router.get("/dajNajboljePoSportu/{id}/{brojIgraca}")
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
    ).join(subquery1, subquery2.c.id_sporta == subquery1.c.id_sporta).order_by(desc(subquery1.c.recenzija))

    results = query.limit(brojIgraca).all()
    return  [SportistaSport(naziv_sporta=row.naziv_sporta, ime=row.ime_igraca, prezime=row.prezime_igraca, rating=(row.recenzija or 2.5)) for row in results]


@router.get("/dajNajboljeEkipePoSportu/{id}/{brojIgraca}")
async def sport(id:int,brojIgraca:int, db:Session=Depends(get_db)):
    subquery= db.query(
    Ekipa.naziv_ekipe,
    Sifarnik_sportova.naziv_sporta,
    Ekipa.broj_pobjeda,
    Ekipa.broj_poraza
    ).join(Sifarnik_sportova, Sifarnik_sportova.id_sporta == Ekipa.id_sporta).order_by(desc(Ekipa.broj_pobjeda/(Ekipa.broj_pobjeda +Ekipa.broj_poraza ))).limit(brojIgraca).all()
    return [EkipaSport(naziv_sporta=row.naziv_sporta, ime=row.naziv_ekipe, winrate=(row.broj_pobjeda or 0)/((row.broj_pobjeda or 1)+(row.broj_poraza or 0))) for row in subquery]


@router.put("/dodajSposobnost/{sposobnost}/{id}")
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
        db_igrac.nivo_sposobnosti = str (round(sposobnost, 2))
        db.commit()


@router.delete("/obrisiSportistu/{id}")
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


@router.get("/dajFiltriraneOglase/{id_sporta}/{nivo}/{spol}")
async def eventi(id_sporta:int, nivo:str, spol:int, db:Session=Depends(get_db)):
    try:
        spol_bool = None
        if spol == 0:
            spol_bool = False
        elif spol == 1:
            spol_bool = True

        nivo_range = {
            "0.33": (0, 0.33),
            "0.66": (0.33, 0.66),
            "1": (0.66, 1)
        }

        result = db.query(
            Event_u_pripremi,
            Igrac.ime_igraca,
            Igrac.srednje_ime,
            Igrac.prezime_igraca,
            Igrac.picture_data,
            Sifarnik_sportova.naziv_sporta,
            Lokacija.longituda,
            Lokacija.latituda,
            Event_u_pripremi.naziv_termina,
            Event_u_pripremi.opis_termina,
            Event_u_pripremi.pocetak_termina,
            Event_u_pripremi.broj_slobodnih_mjesta,
            Korisnik.korisnicko_ime
        ).join(
            Igrac, Event_u_pripremi.id_organizatora == Igrac.id_igraca
        ).join(
            Korisnik, Korisnik.id_korisnika == Event_u_pripremi.id_organizatora
        ).join(
            Lokacija, Event_u_pripremi.id_lokacije == Lokacija.id_lokacije
        ).join(
            Sifarnik_sportova, Event_u_pripremi.id_sporta == Sifarnik_sportova.id_sporta
        ).order_by(
            asc(Event_u_pripremi.pocetak_termina)
        )

        if id_sporta != 0:
            result = result.filter(Event_u_pripremi.id_sporta == id_sporta)
        if nivo != "svi":
            first, second = nivo_range.get(nivo, (0, 1))
            result = result.filter(Event_u_pripremi.potreban_nivo_sposobnosti.between(str(first), str(second)))
        if spol_bool is not None:
            result = result.filter(Event_u_pripremi.spol == spol_bool)

        result = result.filter(Event_u_pripremi.broj_slobodnih_mjesta > 0).all()

        return [
            Oglas(
                ime_igraca=row.ime_igraca,
                prezime_igraca=row.prezime_igraca,
                srednje_ime=row.srednje_ime,
                slika=row.picture_data,
                naziv_sporta=row.naziv_sporta,
                longituda=row.longituda,
                latituda=row.latituda,
                naziv_termina=row.naziv_termina,
                opis_termina=row.opis_termina,
                pocetak_termina=row.pocetak_termina,
                broj_slobodnih_mjesta=row.broj_slobodnih_mjesta,
                korisnicko_ime=row.korisnicko_ime
            ) for row in result
        ]

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/testPrijateljstva/{id1}/{id2}")
async def dodaj(id1:int, id2:int, db:Session=Depends(get_db) ):
    novo_prijateljstvo=Prijatelj(id_prijatelja1=id1, id_prijatelja2=id2)
    db.add(novo_prijateljstvo)
    db.commit()

    db.refresh(novo_prijateljstvo)

@router.get("/dajObjavePrijatelja/{id}")
async def objave(id:int, db:Session=Depends(get_db)):
    result = (db.query(Prijatelj)
              .filter(Prijatelj.id_prijatelja1==id)\
              .join(Objava, Prijatelj.id_prijatelja2==Objava.id_korisnika)\
              .join(Korisnik, Korisnik.id_korisnika==Prijatelj.id_prijatelja2) \
              .add_columns(Prijatelj.id_prijatelja2, Objava.tekst_objave, Korisnik.korisnicko_ime).all())

    return [
        ObjavaSchema(
            id_korisnika=row.id_prijatelja2,
            tekst_objave=row.tekst_objave,
            korisnicko_ime=row.korisnicko_ime)
        for row in result]
    


# @router.get("/events-in-preparation/")
# def get_events_in_preparation(db: Session = Depends(database.get_db)):
#     result = db.query(models.Event_u_pripremi)\
#                .join(models.Event, models.Event_u_pripremi.id_eventa == models.Event.id)\
#                .join(models.Igrac, models.Event.id_igraca == models.Igrac.id)\
#                .join(models.Lokacija, models.Event.id_lokacije == models.Lokacija.id)\
#                .add_columns(models.Igrac.ime, models.Igrac.prezime, models.Event.naziv, models.Lokacija.naziv.label("lokacija_naziv"))\
#                .all()
#     return result



#Komplikovanija ruta, salje se id igraca iz sesije, pronalazi se korisnik koji je povezan s tim igracem nakon toga
#izlistava sve prijatelje trenutnog igraca ali koji se nalaze u tabeli igraca (ne u tabeli vlasnika)
@router.get("/pretraziPrijatelje/{id}/{username}/{svi}")
async def pretrazi_username(id: int, username: str,svi:bool, db: Session = Depends(get_db)):

    id_korisnika=db.query(Korisnik).filter(Korisnik.id_korisnika==id).first()
    print(id_korisnika.id_uloge)
    if (id_korisnika.id_uloge==1 or id_korisnika.id_uloge==3):
        id_korisnika=id_korisnika.id_korisnika
        print(id_korisnika)
    else:
        print("nije sportista")
        return None    
    
    if (svi==True):
        print("usao")
        print(db.query(Korisnik).filter(or_(
            Korisnik.id_uloge == 1,
            Korisnik.id_uloge == 3
        ) ))
        return db.query(Korisnik).filter(or_(
            Korisnik.id_uloge == 1,
            Korisnik.id_uloge == 3
        ) )\
        .join(Prijatelj, Korisnik.id_korisnika == Prijatelj.id_prijatelja2)\
        .filter(Prijatelj.id_prijatelja1 == id_korisnika).all()
        #.join(Igrac, Igrac.id_korisnika==Korisnik.id_korisnika)\
        


@router.post("/dodajEkipu")
async def dodaj(ekipa:EkipaSchema, db:Session=Depends(get_db)):
    id_igraca=db.query(Igrac.id_igraca).filter(Igrac.id_igraca==ekipa.id_kapitena).first()
    if (id_igraca):
        nova_ekipa=Ekipa(naziv_ekipe=ekipa.naziv_ekipe, id_sporta=ekipa.id_sporta,kapiten=id_igraca[0])
    else:
        nova_ekipa=Ekipa(naziv_ekipe=ekipa.naziv_ekipe, id_sporta=ekipa.id_sporta)  
    db.add(nova_ekipa)
    db.commit()

    db.refresh(nova_ekipa)
    nova_veza=Veza_igrac_ekipa(id_ekipe=nova_ekipa.id_ekipe, id_igraca=id_igraca[0])
    db.add(nova_veza)
    db.commit()
    db.refresh(nova_veza)
    return nova_veza


@router.post("/dodajClanoveEkipe")
async def dodaj(ekipa:EkipaSaClanovimaSchema, db:Session=Depends(get_db)):
    for igrac in ekipa.igraci:
        id=db.query(Igrac.id_igraca).filter(Igrac.id_korisnika==igrac).first()
        novi_igrac=Veza_igrac_ekipa(id_ekipe=ekipa.id_ekipe, id_igraca=id[0])
        db.add(novi_igrac)
        db.commit()

@router.get("/dajSportistu/{id_korisnika}")
async def vrati(id_korisnika:int, db:Session=Depends(get_db)):
    return db.query(Igrac).filter(Igrac.id_korisnika==id_korisnika).first()

@router.get("/dajVlasnika/{id_korisnika}")
async def vrati(id_korisnika:int, db:Session=Depends(get_db)):
    return db.query(Vlasnik).filter(Vlasnik.id_korisnika==id_korisnika).first()

@router.post("/dodajAdresu")
async def teren(adresa:AdresaSchema, db:Session=Depends(get_db)):
    
    nova_adresa=Adresa(naziv_ulice=adresa.naziv_ulice, postanski_broj=adresa.postanski_broj, grad=adresa.grad, drzava=adresa.drzava )


    db.add(nova_adresa)
    db.commit()
    db.refresh(nova_adresa)
    return nova_adresa       

@router.post("/dodajTeren/{sport}")
async def teren(teren:LokacijaSchema,sport:int, adresa:AdresaSchema, db:Session=Depends(get_db)):
    print(teren)
    nova_adresa=Adresa(naziv_ulice=adresa.naziv_ulice, postanski_broj=adresa.postanski_broj, grad=adresa.grad, drzava=adresa.drzava )


    db.add(nova_adresa)
    db.commit()
    db.refresh(nova_adresa)
       
    
    nova_lokacija=Lokacija(naziv_terena=teren.naziv_lokacije, kapacitet=teren.kapacitet,longituda=teren.longituda, latituda=teren.latituda, id_vlasnika=teren.id_vlasnika, id_adrese=nova_adresa.id_adrese, cijena_po_terminu=teren.cijena_po_terminu, recenzija=teren.recenzija, opis_lokacije=teren.opis_Lokacije, naziv_lokacije=teren.naziv_lokacije, opis_terena=teren.opis_Lokacije, picture_data=teren.picture_data)
    db.add(nova_lokacija)
    db.commit()

    db.refresh(nova_lokacija)

    nova_veza=Veza_lokacija_sport(id_lokacije=nova_lokacija.id_lokacije, id_sporta=sport)

    db.add(nova_veza)
    db.commit()

    db.refresh(nova_veza)
    return nova_lokacija


@router.get("/dajKorisnika/{id_korisnika}")
async def korisnik(id_korisnika:int, db:Session=Depends(get_db)):
    return db.query(Korisnik).filter(Korisnik.id_korisnika==id_korisnika).first()
