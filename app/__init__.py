from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from pynuts import Pynuts
from app.config import default

app = Flask(__name__)
app.config.from_object(default)
app.db = SQLAlchemy(app)
app.db.metadata.reflect(bind=app.db.get_engine(app))
nuts = Pynuts(app)

app.jinja_env.trim_blocks = True
app.jinja_env.globals.update(dict(
    app=app,
    nuts=nuts
))


from . import routes
