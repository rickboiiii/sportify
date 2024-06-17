from datetime import datetime

from backend.models import Message
from .seeder import Seeder


def messages_seeder():
    class SeederMessage(Seeder):
        pass

    options = {
        'model': Message,
        'id_field': 'id',
    }

    data = [
        {
            'id_chata': 1,
            'from_user_id': 1,
            'to_user_id': 2,
            'message': 'hellooo',
            'timestamp': datetime.now()
        },
        {
            'id_chata': 1,
            'from_user_id': 2,
            'to_user_id': 1,
            'message': 'hellooo back',
            'timestamp': datetime.now()
        },
        {
            'id_chata': 2,
            'from_user_id': 1,
            'to_user_id': 3,
            'message': 'hellooo my guy',
            'timestamp': datetime.now()
        },
        {
            'id_chata': 3,
            'from_user_id': 4,
            'to_user_id': 5,
            'message': 'heyy',
            'timestamp': datetime.now()
        },
        {
            'id_chata': 4,
            'from_user_id': 6,
            'to_user_id': 7,
            'message': 'supp',
            'timestamp': datetime.now()
        },
        {
            'id_chata': 5,
            'from_user_id': 8,
            'to_user_id': 1,
            'message': 'what is up',
            'timestamp': datetime.now()
        },
        {
            'id_chata': 3,
            'from_user_id': 5,
            'to_user_id': 4,
            'message': 'heyy you',
            'timestamp': datetime.now()
        },
        {
            'id_chata': 4,
            'from_user_id': 6,
            'to_user_id': 7,
            'message': 'heloooooo',
            'timestamp': datetime.now()
        },
    ]

    SeederMessage(options).seed(data)
