from backend.models import Event_u_pripremi
from .seeder import Seeder


def eventi_seeder():
    class SeederEventi(Seeder):
        pass

    options = {
        'model': Event_u_pripremi,
        'id_field': 'id_eventa',
    }

    data = [
        {
            'id_lokacije': 1,
            'id_organizatora': 1,
            'id_sporta': 1,
            'naziv_termina': 'Mali fudbal',
            'opis_termina': 'Opis za mali fudbal',
            'vrsta_termina': 'Termin',
            'pocetak_termina': '2024-06-19',
            'potreban_nivo_sposobnosti': 0.33,
            'spol': 1,
            'minimalan_broj_igraca': 2,
            'maksimalan_broj_igraca': 100,
            'broj_slobodnih_mjesta': 10,
            'popunjen': 0
        },
        {
            'id_lokacije': 2,
            'id_organizatora': 1,
            'id_sporta': 2,
            'naziv_termina': 'Kosarka',
            'opis_termina': 'Opis za kosarku',
            'vrsta_termina': 'Termin',
            'pocetak_termina': '2024-06-20',
            'potreban_nivo_sposobnosti': 0.66,
            'spol': 0,
            'minimalan_broj_igraca': 2,
            'maksimalan_broj_igraca': 100,
            'broj_slobodnih_mjesta': 6,
            'popunjen': 0
        },
        {
            'id_lokacije': 1,
            'id_organizatora': 1,
            'id_sporta': 3,
            'naziv_termina': 'Odbojka',
            'opis_termina': 'Opis za odbojku',
            'vrsta_termina': 'Termin',
            'pocetak_termina': '2024-06-22',
            'potreban_nivo_sposobnosti': 0.33,
            'spol': 0,
            'minimalan_broj_igraca': 2,
            'maksimalan_broj_igraca': 100,
            'broj_slobodnih_mjesta': 4,
            'popunjen': 0
        },
        {
            'id_lokacije': 1,
            'id_organizatora': 1,
            'id_sporta': 4,
            'naziv_termina': 'Rukomet',
            'opis_termina': 'Opis za Rukomet',
            'vrsta_termina': 'Termin',
            'pocetak_termina': '2024-06-22',
            'potreban_nivo_sposobnosti': 0.66,
            'spol': 1,
            'minimalan_broj_igraca': 2,
            'maksimalan_broj_igraca': 100,
            'broj_slobodnih_mjesta': 8,
            'popunjen': 0
        },
    ]

    SeederEventi(options).seed(data)
