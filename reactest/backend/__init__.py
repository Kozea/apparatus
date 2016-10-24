import os

import pkg_resources
from flask import Flask

__version__ = pkg_resources.require("reactest")[0].version

app = Flask(__name__)
app.config.from_pyfile(os.getenv('FLASK_CONFIG'))
if app.debug:
    app.config['STATIC_SERVER'] = 'http://' + os.getenv('STATIC_SERVER')


from .routes import *  # noqa
