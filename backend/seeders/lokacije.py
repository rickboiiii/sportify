from backend.models import Lokacija
from .seeder import Seeder


def lokacije_seeder():
    class SeederLokacije(Seeder):
        pass

    options = {
        'model': Lokacija,
        'id_field': 'id_lokacije',
    }

    data = [
        {
            'id_vlasnika': 1,
            'id_adrese': 7,
            'naziv_lokacije': 'Igraliste A',
            'opis_lokacije': 'Igraliste A - asfalt',
            'recenzija': 4,
            'cijena_po_terminu': 2,
            'kapacitet': 10,
            'longituda': 18.372320785104883,
            'latituda': 43.84867401344799,
            'naziv_terena': 'Igraliste A',
            'opis_terena': 'Igraliste A - asfalt',
            'picuture_data': '/igraliste_A.png'
        },
        {
            'id_vlasnika': 1,
            'id_adrese': 7,
            'naziv_lokacije': 'Igraliste B',
            'opis_lokacije': 'Igraliste B - asfalt',
            'recenzija': 5,
            'cijena_po_terminu': 3,
            'kapacitet': 13,
            'longituda': 18.372320785104883,
            'latituda': 43.84867401344799,
            'naziv_terena': 'Igraliste B',
            'opis_terena': 'Igraliste B - asfalt',
            'picuture_data': '/igraliste_A.png'
        },
        {
            'id_vlasnika': 1,
            'id_adrese': 7,
            'naziv_lokacije': 'Igraliste C',
            'opis_lokacije': 'Igraliste C - asfalt',
            'recenzija': 3,
            'cijena_po_terminu': 5,
            'kapacitet': 10,
            'longituda': 18.372320785104883,
            'latituda': 43.84867401344799,
            'naziv_terena': 'Igraliste C',
            'opis_terena': 'Igraliste C - asfalt',
            'picuture_data': '/igraliste_A.png'
        },
        {
            'id_vlasnika': 1,
            'id_adrese': 7,
            'naziv_lokacije': 'Igraliste D',
            'opis_lokacije': 'Igraliste D - asfalt',
            'recenzija': 1,
            'cijena_po_terminu': 20,
            'kapacitet': 10,
            'longituda': 18.372320785104883,
            'latituda': 43.84867401344799,
            'naziv_terena': 'Igraliste C',
            'opis_terena': 'Igraliste C - asfalt',
            'picuture_data': '/igraliste_A.png'
        },
    ]

    SeederLokacije(options).seed(data)
