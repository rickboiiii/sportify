from backend.models import Sifarnik_sportova
from .seeder import Seeder


def sport_seeder():
    class SeederSport(Seeder):
        pass

    options = {
        'model': Sifarnik_sportova,
        'id_field': 'id_sporta',
    }

    data = [
        {
            'naziv_sporta': 'Fuutbal',
            'broj_igraca': 11,
            'zatvorenog_tipa': 1
        },
        {
            'naziv_sporta': 'Kosarka',
            'broj_igraca': 5,
            'zatvorenog_tipa': 1
        },
        {
            'naziv_sporta': 'Odbojka',
            'broj_igraca': 6,
            'zatvorenog_tipa': 1
        },
        {
            'naziv_sporta': 'Rukomet',
            'broj_igraca': 7,
            'zatvorenog_tipa': 1
        },
        {
            'naziv_sporta': 'Tenis',
            'broj_igraca': 2,
            'zatvorenog_tipa': 1
        },
        {
            'naziv_sporta': 'Teretana',
            'broj_igraca': 1,
            'zatvorenog_tipa': 1
        },
        {
            'naziv_sporta': 'Plivanje',
            'broj_igraca': 1,
            'zatvorenog_tipa': 1
        }
    ]

    SeederSport(options).seed(data)
