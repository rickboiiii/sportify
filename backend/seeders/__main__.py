from backend.seeders.seeder import Colors
from backend.seeders.igraci import igraci_seeder
from backend.seeders.vlasnici import vlasnici_seeder
from backend.seeders.korisnici import korisnici_seeder
from backend.seeders.uloge import uloge_seeder

if __name__ == '__main__':
    Colors().main()
    uloge_seeder()
    korisnici_seeder()
    igraci_seeder()
    vlasnici_seeder()
