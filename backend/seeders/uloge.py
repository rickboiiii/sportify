import psycopg2

from backend.database import SessionLocal
from backend.models_singleton import Uloga


def uloge_seeders():
    print("Seeding uloge...")

    db = SessionLocal()

    data = [
        {
            'id': 1,
            'naziv_uloge': 'Admin1'
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

    db.bulk_insert_mappings(Uloga, data)
    db.commit()
