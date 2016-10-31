import os

import pkg_resources
from flask import Flask


__version__ = pkg_resources.require("reactest")[0].version

app = Flask(__name__)
app.config.from_pyfile(os.getenv('FLASK_CONFIG'))

app.config['RENDER_SERVER'] = os.getenv('RENDER_SERVER')
app.config['STATIC_SERVER'] = os.getenv('STATIC_SERVER')

app.static_folder = os.path.join(
    os.path.dirname(__file__), '..', 'frontend', 'static')

from .routes import *  # noqa
