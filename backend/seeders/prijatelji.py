from backend.models import Prijatelj
from .seeder import Seeder


def prijatelji_seeder():
    class SeederPrijatelji(Seeder):
        pass

    options = {
        'model': Prijatelj,
        'id_field': 'id_prijateljstva',
    }

    data = [
        {
            'id_prijatelja1': 1,
            'id_prijatelja2': 2,
        },
        {
            'id_prijatelja1': 1,
            'id_prijatelja2': 3,
        },
        {
            'id_prijatelja1': 1,
            'id_prijatelja2': 4,
        },
        {
            'id_prijatelja1': 1,
            'id_prijatelja2': 5,
        },
        {
            'id_prijatelja1': 1,
            'id_prijatelja2': 6,
        },
        {
            'id_prijatelja1': 1,
            'id_prijatelja2': 7,
        },
        {
            'id_prijatelja1': 1,
            'id_prijatelja2': 8,
        },
        {
            'id_prijatelja1': 4,
            'id_prijatelja2': 5,
        },
        {
            'id_prijatelja1': 4,
            'id_prijatelja2': 6,
        },
        {
            'id_prijatelja1': 4,
            'id_prijatelja2': 7,
        },
        {
            'id_prijatelja1': 4,
            'id_prijatelja2': 8,
        }
    ]

    SeederPrijatelji(options).seed(data)
