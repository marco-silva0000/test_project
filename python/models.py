import app
import sqlalchemy
import orm
from decimal import Decimal


class Person(orm.Model):
    __tablename__ = "person"
    __database__ = app.database
    __metadata__ = app.metadata

    id = orm.Integer(primary_key=True)
    name = orm.String(max_length=100)
    age = orm.Integer()
    balance = orm.Integer(default=0)
    balance_decimal_places = orm.Integer(default=0)
    currency = orm.String(default='$', max_length=5)
    email = orm.String(max_length=100)
    address = orm.String(max_length=300, allow_blank=True)
    is_favorite = orm.Boolean(default=False)

    @property
    def balance_exact(self):
        return Decimal(self.balance).shift(self.balance_decimal_places)


def create_db():
    engine = sqlalchemy.create_engine(str(app.database.url))
    app.metadata.create_all(engine)
    return engine
