from backend.models_singleton import Uloga
from .seeder import Seeder


def uloge_seeder():
    class SeederUloge(Seeder):
        pass

    options = {
        'model': Uloga,
        'id_field': 'id_uloge',
    }

    data = [
        {
            'id': 1,
            'naziv_uloge': 'Admin'
        },
        {
            'id': 2,
            'naziv_uloge': 'Korisnik'
        },
        {
            'id': 3,
            'naziv_uloge': 'Vlasnik'
        }
    ]

    SeederUloge(options).seed(data)
