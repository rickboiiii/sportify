from backend.seeders.seeder import Colors
from backend.seeders.igraci import igraci_seeder
from backend.seeders.vlasnici import vlasnici_seeder
from backend.seeders.korisnici import korisnici_seeder
from backend.seeders.uloge import uloge_seeder
from backend.seeders.prijatelji import prijatelji_seeder
from backend.seeders.sportovi import sport_seeder

if __name__ == '__main__':
    Colors().main()
    sport_seeder()
    uloge_seeder()
    korisnici_seeder()
    prijatelji_seeder()
    igraci_seeder()
    vlasnici_seeder()
