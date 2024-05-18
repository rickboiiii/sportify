from backend.database import SessionLocal
from sqlalchemy import text


class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

    def __str__(self):
        pass

    def main(self):
        print(f"{self.HEADER}{self.UNDERLINE}Seeding started...{self.ENDC}")

    def seeding(self, table_name):
        print(f"{self.OKCYAN}Seeding {table_name}...", end="\t")

    def done(self):
        print(f"{self.OKGREEN}{self.BOLD}DONE{self.ENDC}")


class Seeder:
    def __init__(self, options):
        self.model = options['model']
        self.database = SessionLocal()
        self.table_name = self.model.__tablename__
        self.auto_increment = self.table_name + "_" + options['id_field'] + "_seq"

    def truncate(self):
        truncate = text(f"TRUNCATE TABLE {self.table_name} CASCADE;")
        reset_auto_increment = text(f"ALTER SEQUENCE {self.auto_increment} RESTART WITH 1;")
        self.database.execute(truncate)
        self.database.execute(reset_auto_increment)
        self.database.commit()

    def seed(self, data):
        self.truncate()
        Colors().seeding(self.table_name)
        self.database.bulk_insert_mappings(self.model, data)
        self.database.commit()
        Colors().done()
