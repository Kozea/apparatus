import logging
import os

from flask import Flask

from .model import Color, Shape, db

app = Flask(__name__)
app.config.from_envvar('FLASK_CONFIG')
db.init_app(app)


@app.cli.command()
def create_db():
    db.metadata.create_all(db.engine)


@app.cli.command()
def insert_data():
    db.session()
    db.session.add(Color(name='red', hex='#ff0000', rgb='rgb(255, 0, 0)'))
    db.session.add(Color(name='blue', hex='#0000ff', rgb='rgb(0, 0, 255)'))
    db.session.add(Color(name='green', hex='#00ff00', rgb='rgb(0, 255, 0)'))
    db.session.add(Shape(name='triangle', sides=3))
    db.session.add(Shape(name='square', sides=4))
    db.session.add(Shape(name='pentagon', sides=5))
    db.session.add(Shape(name='hexagon', sides=6))
    db.session.commit()
    db.session.remove()


if app.debug:
    level = logging.INFO if os.getenv('PYTHON_VERBOSE', os.getenv('VERBOSE')
                                      ) else logging.WARNING
    app.logger.setLevel(level)
    logging.getLogger('sqlalchemy').setLevel(level)
    logging.getLogger('sqlalchemy'
                      ).handlers = logging.getLogger('werkzeug').handlers
    logging.getLogger('sqlalchemy.orm').setLevel(logging.WARNING)
    logging.getLogger('unrest').setLevel(level)
    logging.getLogger('unrest'
                      ).handlers = logging.getLogger('werkzeug').handlers
    if level == logging.WARNING:
        logging.getLogger('werkzeug').setLevel(level)

from .api import *  # noqa isort:skip
from .routes import *  # noqa isort:skip
