from backend.models import Vlasnik
from .seeder import Seeder


def vlasnici_seeder():
    class SeederVlasnici(Seeder):
        pass

    options = {
        'model': Vlasnik,
        'id_field': 'id_vlasnika',
    }

    data = [
        {
            'id_korisnika': 1,
            'ime_vlasnika': 'Root',
            'prezime_vlasnika': 'Admin',
            'srednje_ime': None,
            'datum_rodjenja': '1970-01-01',
            'spol': 1,
            'recenzija': 5,
        },
        {
            'id_korisnika': 3,
            'ime_vlasnika': 'Pocetni',
            'prezime_vlasnika': 'Vlasnik',
            'srednje_ime': None,
            'datum_rodjenja': '1970-01-01',
            'spol': 0,
            'recenzija': 4,
        }
    ]

    SeederVlasnici(options).seed(data)
