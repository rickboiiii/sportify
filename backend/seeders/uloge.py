from backend.models import Uloga
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
            'naziv_uloge': 'Admin'
        },
        {
            'naziv_uloge': 'Korisnik'
        },
        {
            'naziv_uloge': 'Vlasnik'
        }
    ]

    SeederUloge(options).seed(data)
