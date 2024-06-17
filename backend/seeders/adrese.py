from backend.models import Adresa
from .seeder import Seeder


def adrese_seeder():
    class SeederAdrese(Seeder):
        pass

    options = {
        'model': Adresa,
        'id_field': 'id_adrese',
    }

    data = [
        {
            'naziv_ulice': 'Zmaj od Bosne',
            'postanski_broj': 71000,
            'grad': 'Sarajevo',
            'drzava': 'Bosnia and Herzegovina'
        },
        {
            'naziv_ulice': 'Behdzeta Mutevelica',
            'postanski_broj': 71000,
            'grad': 'Sarajevo',
            'drzava': 'Bosnia and Herzegovina'
        },
        {
            'naziv_ulice': 'Aleja Lipa',
            'postanski_broj': 71000,
            'grad': 'Sarajevo',
            'drzava': 'Bosnia and Herzegovina'
        },
        {
            'naziv_ulice': 'Vlisonovo setaliste',
            'postanski_broj': 71000,
            'grad': 'Sarajevo',
            'drzava': 'Bosnia and Herzegovina'
        },
        {
            'naziv_ulice': 'Kolodvorska',
            'postanski_broj': 71000,
            'grad': 'Sarajevo',
            'drzava': 'Bosnia and Herzegovina'
        },
        {
            'naziv_ulice': 'Grbavicka',
            'postanski_broj': 71000,
            'grad': 'Sarajevo',
            'drzava': 'Bosnia and Herzegovina'
        },
        {
            'naziv_ulice': 'Gradacacka',
            'postanski_broj': 71000,
            'grad': 'Sarajevo',
            'drzava': 'Bosnia and Herzegovina'
        },
    ]

    SeederAdrese(options).seed(data)
