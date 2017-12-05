from sqlalchemy.engine import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.sql.schema import Column
from sqlalchemy.types import Integer, String

Base = declarative_base()


class Color(Base):
    __tablename__ = 'color'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    hex = Column(String)
    rgb = Column(String)


class Shape(Base):
    __tablename__ = 'shape'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    sides = Column(Integer)


class Db(object):
    def __init__(self):
        self.metadata = Base.metadata
        self.Session = sessionmaker()

    def init_app(self, app):
        self.app = app
        self.engine = create_engine(app.config['DB'])
        self.Session.configure(bind=self.engine)
        self.session = scoped_session(self.Session)

        @app.teardown_appcontext
        def teardown_appcontext(*args, **kwargs):
            db.session.remove()


db = Db()
