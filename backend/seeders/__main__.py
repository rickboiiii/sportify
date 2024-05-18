from backend.seeders.seeder import Colors
from .korisnici import korisnici_seeder
from .uloge import uloge_seeder

if __name__ == '__main__':
    Colors().main()
    uloge_seeder()
    korisnici_seeder()
