from sqlalchemy import Boolean, CheckConstraint, Column, ForeignKey, ForeignKeyConstraint, Integer, String, Date, Float, DateTime
from sqlalchemy.orm import relationship
from typing_extensions import deprecated

from .database import Base


@deprecated('use class inside models/korisnik.py')
class Korisnik(Base):
    __tablename__ = "korisnici"

    id_korisnika = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, index=True)
    sifra = Column(String)
    korisnicko_ime = Column(String)
    id_uloge = Column(Integer, ForeignKey("uloge.id_uloge"))
    
    uloga= relationship("Uloga", back_populates="korisnici")
    igraci=relationship("Igrac", back_populates="korisnici")
    vlasnici=relationship("Vlasnik", back_populates="korisnici")
    # prijatelj1=relationship("Prijatelj", back_populates="korisnik1")
    # prijatelj2=relationship("Prijatelj", back_populates="korisnik2")

# class Prijatelj(Base):
#     __tablename__="prijatelji"
#     id_prijateljstva =Column(Integer, primary_key=True, autoincrement=True)
#     id_prijatelja1=Column(Integer, ForeignKey("korisnici.id_korisnika"))
#     id_prijatelja2=Column(Integer, ForeignKey("korisnici.id_korisnika"))
#     korisnik1=relationship("Korisnik", back_populates="prijatelj1")
#     korisnik2=relationship("Korisnik", back_populates="prijatelj2")


@deprecated('use class inside models/igrac.py')
class Igrac(Base):
    __tablename__ = "igraci"

    id_igraca = Column(Integer, primary_key=True, autoincrement = True)
    id_korisnika=Column(Integer, ForeignKey("korisnici.id_korisnika"), unique=True)
    ime_igraca = Column(String)
    prezime_igraca = Column(String)
    srednje_ime = Column(String)
    datum_rodjenja = Column(String)
    spol = Column(Boolean)
    visina = Column(Integer)
    tezina = Column(Integer)
    nivo_sposobnosti = Column(String)
    max_dozvoljena_udaljenost = Column(Integer)
    verifikovan=Column(Boolean)
    recenzija=Column(Float,CheckConstraint("recenzija>=1 and recenzija<=5"))
    #data = Column(LargeBinary) PRIKAZ SLIKE ?
    #format = Column(String)  # Dodatni atribut za pohranu formata slike
    korisnici=relationship("Korisnik", back_populates="igraci")
    recenzije_igraca= relationship("RecenzijaIgraca",back_populates= "igraci")
    sportovi=relationship("Veza_igrac_sport", back_populates="igraci")
    termini_u_pripremi=relationship("Event_u_pripremi", back_populates="organizator")
    event = relationship("Veza_igrac_termin_u_pripremi", back_populates="igrac")
    #eventZavrseni=relationship("Veza_igrac_termin_zavrseni", back_populates="igrac")
    ekipe=relationship("Veza_igrac_ekipa", back_populates="igrac")


@deprecated('use class inside models/vlasnik.py')
class Vlasnik(Base):
    __tablename__= "vlasnici"

    id_vlasnika = Column(Integer, primary_key=True, autoincrement = True)
    id_korisnika=Column(Integer, ForeignKey("korisnici.id_korisnika"), unique=True)
    ime_vlasnika = Column(String)
    prezime_vlasnika = Column(String)
    srednje_ime = Column(String)
    datum_rodjenja = Column(Date)
    spol = Column(Boolean)
    recenzija=Column(Float,CheckConstraint("recenzija>=1 and recenzija<=5"))
    #data = Column(LargeBinary) PRIKAZ SLIKE ?
    #format = Column(String)  # Dodatni atribut za pohranu formata slike; treba pretvarati u binarno i obratno
    korisnici= relationship("Korisnik", back_populates= "vlasnici")
    recenzije_vlasnika= relationship("RecenzijaVlasnika", back_populates="vlasnici") 
    lokacije=relationship("Lokacija", back_populates="vlasnici")


@deprecated('use class inside models/uloga.py')
class Uloga(Base):
    __tablename__ = "uloge"
    #id_uloge 1-igrac, 2-vlasnik, 3-oboje
    id_uloge = Column(Integer, primary_key=True, autoincrement = True)
    naziv_uloge = Column(String)
    #id_korisnika = Column(Integer, ForeignKey("korisnici.id_korisnika"))
    korisnici = relationship("Korisnik", back_populates="uloga")


@deprecated('use class inside models/lokacija.py')
class Lokacija (Base):
    __tablename__="lokacije"
    id_lokacije=Column(Integer, primary_key=True, autoincrement=True)
    id_vlasnika=Column(Integer, ForeignKey("vlasnici.id_vlasnika"))
    vlasnici=relationship("Vlasnik", back_populates="lokacije")
    id_adrese=Column(Integer, ForeignKey("adrese.id_adrese"))
    recenzija=Column(Float, CheckConstraint("recenzija>=1 and recenzija<=5"))
    cijena_po_terminu=Column(Float,CheckConstraint("cijena_po_terminu>0 or cijena_po_terminu is null"), nullable=True)

    
    adrese = relationship("Adresa", back_populates="lokacija")
    sportovi = relationship("Veza_lokacija_sport", back_populates="lokacije")
    recenzija_terena= relationship("RecenzijaTerena", back_populates="tereni") 
    slobodni_termini=relationship ("Slobodni_Event", back_populates="lokacije") 
    termini_u_pripremi=relationship("Event_u_pripremi", back_populates="lokacije")
    turnir=relationship("Turnir", back_populates="lokacija")


@deprecated('use class inside models/adresa.py')
class Adresa(Base):
    __tablename__="adrese"

    id_adrese=Column(Integer, primary_key=True, autoincrement=True)
    naziv_ulice=Column(String, nullable=False)
    postanski_broj=Column (Integer, nullable=False, unique=True)
    grad=Column(String, nullable=False)
    drzava=Column(String, nullable=False)

    lokacija=relationship("Lokacija", back_populates="adrese")    


@deprecated('use class inside models/slobodni_event.py')
class Slobodni_Event(Base):
    __tablename__="slobodni_eventi"
    id_eventa=Column(Integer, primary_key=True, autoincrement=True)
    id_lokacije=Column(Integer, ForeignKey("lokacije.id_lokacije"))
    pocetak_termina=Column(DateTime, nullable=False)
    kraj_termina=Column(DateTime, nullable=False)
    lokacije=relationship ("Lokacija", back_populates="slobodni_termini")


@deprecated('use class inside models/event_u_pripremi.py')
class Event_u_pripremi(Base):
    __tablename__="eventi_u_pripremi"

    id_eventa=Column(Integer, primary_key=True, autoincrement=True)
    id_lokacije=Column(Integer, ForeignKey("lokacije.id_lokacije"))
    lokacije=relationship("Lokacija", back_populates="termini_u_pripremi")
    id_organizatora=Column(Integer, ForeignKey("igraci.id_igraca"))
    organizator=relationship("Igrac", back_populates="termini_u_pripremi") 
    id_sporta=Column(Integer, ForeignKey("sportovi.id_sporta"))
    sport=relationship("Sifarnik_sportova", back_populates="termin_u_pripremi")   
    naziv_termina=Column(String, nullable=True, index=True)
    opis_termina=Column(String, nullable=True)
    vrsta_termina=Column(String, nullable=False)
    pocetak_termina=Column(DateTime)
    potreban_nivo_sposobnosti=Column(Integer)
    spol=Column(Boolean, nullable=True)
    minimalan_broj_igraca=Column(Integer)
    maksimalan_broj_igraca=Column(Integer)
    broj_slobodnih_mjesta=Column(Integer)
    popunjen=Column(Boolean, nullable=False)
    igrac=relationship("Veza_igrac_termin_u_pripremi", back_populates="event")


@deprecated('use class inside models/ekipa.py')
class Ekipa(Base):
    __tablename__="ekipe"
    id_ekipe=Column(Integer, primary_key=True, autoincrement=True)
    naziv_ekipe=Column(String)
    id_sporta=Column(Integer, ForeignKey("sportovi.id_sporta"))

    sport=relationship("Sifarnik_sportova", back_populates="ekipe")
    igrac=relationship("Veza_igrac_ekipa", back_populates="ekipe")
    turnir=relationship("Veza_ekipa_turnir", back_populates="ekipa")


@deprecated('use class inside models/turnir.py')
class Turnir(Base):
    __tablename__="turniri"
    id_turnira = Column(Integer, primary_key=True, autoincrement=True)
    naziv_turnira=Column(String)
    kotizacija=Column(Integer)
    organizator=Column(Integer, ForeignKey("igraci.id_igraca"))
    id_sporta=Column(Integer, ForeignKey("sportovi.id_sporta"))
    id_lokacije =Column(Integer, ForeignKey("lokacije.id_lokacije")) 
    sport=relationship("Sifarnik_sportova", back_populates="turnir")
    lokacija=relationship("Lokacija", back_populates="turnir") 
    ekipa=relationship("Veza_ekipa_turnir", back_populates="turnir")


@deprecated('use class inside models/veza/ekipa_turnir.py')
class Veza_ekipa_turnir(Base):
    __tablename__="veze_ekipa_turnir"
    id_veze=Column (Integer, primary_key=True, autoincrement=True)
    id_ekipe=Column(Integer, ForeignKey("ekipe.id_ekipe"))
    id_turnira=Column(Integer, ForeignKey("turniri.id_turnira")) 
    
    ekipa=relationship("Ekipa", back_populates="turnir") 
    turnir=relationship("Turnir", back_populates="ekipa")     


@deprecated('use class inside models/veza/igrac_ekipa.py')
class Veza_igrac_ekipa(Base):
    __tablename__="veze_igrac_ekipa"
    id_veze=Column (Integer, primary_key=True, autoincrement=True)
    id_ekipe=Column(Integer, ForeignKey("ekipe.id_ekipe"))
    ekipe=relationship("Ekipa", back_populates="igrac")
    id_igraca=Column(Integer, ForeignKey("igraci.id_igraca"))
    igrac=relationship("Igrac", back_populates="ekipe")


@deprecated('use class inside models/sport.py')
class Sifarnik_sportova(Base):
    __tablename__="sportovi"

    id_sporta=Column(Integer, primary_key=True, autoincrement=True)
    naziv_sporta = Column(String, nullable=False)
    broj_igraca=Column(Integer, nullable=False)
    zatvorenog_tipa = Column(Boolean, nullable=False)
    igraci=relationship("Veza_igrac_sport", back_populates="sportovi")
    lokacije=relationship("Veza_lokacija_sport", back_populates="sportovi")
    termin_u_pripremi=relationship("Event_u_pripremi", back_populates="sport")  
    ekipe=relationship("Ekipa", back_populates="sport")
    turnir=relationship("Turnir", back_populates="sport")    


@deprecated('use class inside models/veza/igrac_termin_u_pripremi.py')
class Veza_igrac_termin_u_pripremi(Base):
    __tablename__="veze_igrac_termin_u_pripremi"
    id_veze=Column(Integer, primary_key=True, autoincrement=True)
    id_igraca=Column(Integer, ForeignKey("igraci.id_igraca"))
    igrac = relationship("Igrac", back_populates="event")
    id_eventa=Column(Integer, ForeignKey("eventi_u_pripremi.id_eventa"))
    event=relationship("Event_u_pripremi", back_populates="igrac")


@deprecated('use class inside models/veza/lokacija_sport.py')
class Veza_lokacija_sport(Base):
    __tablename__="veze_lokacije_sport"
    id_veze=Column(Integer, primary_key=True, autoincrement=True)
    id_lokacije=Column(Integer, ForeignKey("lokacije.id_lokacije"))
    lokacije = relationship("Lokacija", back_populates="sportovi")
    id_sporta=Column(Integer, ForeignKey("sportovi.id_sporta"))
    sportovi=relationship("Sifarnik_sportova", back_populates="lokacije")


@deprecated('use class inside models/veza/igrac_sport.py')
class Veza_igrac_sport(Base):
    __tablename__="veze_igrac_sport"

    id_veze=Column(Integer, primary_key=True, autoincrement=True)
    id_igraca=Column(Integer, ForeignKey("igraci.id_igraca"))
    igraci=relationship("Igrac", back_populates="sportovi")
    id_sporta=Column(Integer, ForeignKey("sportovi.id_sporta"))
    sportovi=relationship("Sifarnik_sportova", back_populates="igraci")


@deprecated('use class inside models/recenzija/vlasnik.py')
class RecenzijaVlasnika(Base):
    __tablename__ = "recenzije_vlasnika"

    id_recenzije_vlasnika = Column(Integer, primary_key=True, autoincrement=True)
    id_vlasnika = Column(Integer, ForeignKey("vlasnici.id_vlasnika"))
    komentar = Column(String)
    ocjena = Column(Float)  
    vlasnici= relationship("Vlasnik", back_populates="recenzije_vlasnika")  


@deprecated('use class inside models/recenzija/igrac.py')
class RecenzijaIgraca(Base):
    __tablename__ = "recenzije_igraca"

    id_recenzije_igraca = Column(Integer, primary_key=True, autoincrement=True)
    id_igraca = Column(Integer, ForeignKey("igraci.id_igraca"))
    komentar = Column(String)
    ocjena = Column(Float)
    igraci= relationship("Igrac", back_populates="recenzije_igraca")  


@deprecated('use class inside models/recenzija/teren.py')
class RecenzijaTerena(Base):
    __tablename__ = "recenzije_terena"

    id_recenzije_terena = Column(Integer, primary_key=True, autoincrement=True)
    id_terena = Column(Integer, ForeignKey("lokacije.id_lokacije"))
    komentar = Column(String)
    ocjena = Column(Float)  
    tereni= relationship("Lokacija", back_populates="recenzija_terena")           




     




