from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from pynuts import Pynuts
from app.config import default
import os


class FakeSQLAlchemy(SQLAlchemy):
    def get_engine(self, app, bind=None):
        if not hasattr(self, '_mono_connection'):
            engine = super(FakeSQLAlchemy, self).get_engine(app, bind)
            self._mono_connection = engine.connect()
            self._mono_connection.dialect.supports_sane_rowcount = False
            self._global_transaction = self._mono_connection.begin()
        return self._mono_connection


app = Flask(__name__)
app.config.from_object(default)
if os.environ.get('APP_TESTING'):
    app.db = FakeSQLAlchemy(app)
else:
    app.db = SQLAlchemy(app)

app.db.metadata.reflect(bind=app.db.get_engine(app))


nuts = Pynuts(app)

app.jinja_env.trim_blocks = True
app.jinja_env.globals.update(dict(
    app=app,
    nuts=nuts
))


from . import routes
