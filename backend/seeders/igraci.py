from backend.models import Igrac
from .seeder import Seeder


def igraci_seeder():
    class SeederIgraci(Seeder):
        pass

    options = {
        'model': Igrac,
        'id_field': 'id_igraca',
    }

    data = [
        {
            'id_korisnika': 1,
            'ime_igraca': 'Root',
            'prezime_igraca': 'Admin',
            'srednje_ime': None,
            'datum_rodjenja': '1970-01-01',
            'spol': 1,
            'visina': 200,
            'tezina': 100,
            'nivo_sposobnosti': 'Amazing',
            'max_dozvoljena_udaljenost': 5,
            'verifikovan': 1,
            'recenzija': 5,
        },
        {
            'id_korisnika': 2,
            'ime_igraca': 'Pocetni',
            'prezime_igraca': 'Korisnik',
            'srednje_ime': None,
            'datum_rodjenja': '1970-01-01',
            'spol': 0,
            'visina': 170,
            'tezina': 60,
            'nivo_sposobnosti': 'Amazing',
            'max_dozvoljena_udaljenost': 4,
            'verifikovan': 1,
            'recenzija': 4,
        }
    ]

    SeederIgraci(options).seed(data)
