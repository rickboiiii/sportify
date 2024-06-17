from backend.seeders.seeder import Colors
from backend.seeders.igraci import igraci_seeder
from backend.seeders.vlasnici import vlasnici_seeder
from backend.seeders.korisnici import korisnici_seeder
from backend.seeders.uloge import uloge_seeder
from backend.seeders.prijatelji import prijatelji_seeder
from backend.seeders.sportovi import sport_seeder
from backend.seeders.adrese import adrese_seeder
from backend.seeders.lokacije import lokacije_seeder
from backend.seeders.eventi import eventi_seeder
from backend.seeders.prijavljeni_eventi import prijavljeni_eventi_seeder
from backend.seeders.chats import chats_seeder
from backend.seeders.messages import messages_seeder

if __name__ == '__main__':
    Colors().main()
    sport_seeder()
    uloge_seeder()
    korisnici_seeder()
    prijatelji_seeder()
    igraci_seeder()
    vlasnici_seeder()
    adrese_seeder()
    lokacije_seeder()
    eventi_seeder()
    prijavljeni_eventi_seeder()
    chats_seeder()
    messages_seeder()
