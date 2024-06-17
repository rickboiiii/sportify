from backend.models import PrijavljeniKorisnici
from .seeder import Seeder


def prijavljeni_eventi_seeder():
    class SeederPrijavljeniEventi(Seeder):
        pass

    options = {
        'model': PrijavljeniKorisnici,
        'id_field': 'id_prijave',
    }

    data = [
        {
            'id_eventa': 1,
            'id_korisnika': 1
        },
        {
            'id_eventa': 1,
            'id_korisnika': 2
        },
        {
            'id_eventa': 1,
            'id_korisnika': 3
        },
        {
            'id_eventa': 2,
            'id_korisnika': 4
        },
        {
            'id_eventa': 2,
            'id_korisnika': 5
        },
        {
            'id_eventa': 3,
            'id_korisnika': 6
        },
        {
            'id_eventa': 3,
            'id_korisnika': 7
        },
        {
            'id_eventa': 4,
            'id_korisnika': 7
        },
        {
            'id_eventa': 4,
            'id_korisnika': 8
        },
        {
            'id_eventa': 4,
            'id_korisnika': 1
        },
        {
            'id_eventa': 3,
            'id_korisnika': 1
        },
        {
            'id_eventa': 3,
            'id_korisnika': 8
        },
    ]

    SeederPrijavljeniEventi(options).seed(data)
