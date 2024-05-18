from .korisnici import korisnici_seeder
from .uloge import uloge_seeders

if __name__ == '__main__':
    print("Seeders Running...")
    print("__________________")
    uloge_seeders()
    korisnici_seeder()
