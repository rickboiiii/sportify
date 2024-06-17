from backend.models import Chat
from .seeder import Seeder


def chats_seeder():
    class SeederChat(Seeder):
        pass

    options = {
        'model': Chat,
        'id_field': 'id_chata',
    }

    data = [
        {
            'id_user1': 1,
            'id_user2': 2
        },
        {
            'id_user1': 1,
            'id_user2': 3
        },
        {
            'id_user1': 4,
            'id_user2': 5
        },
        {
            'id_user1': 6,
            'id_user2': 7
        },
        {
            'id_user1': 8,
            'id_user2': 1
        },
    ]

    SeederChat(options).seed(data)
