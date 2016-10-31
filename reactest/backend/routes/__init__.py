import os

from flask import render_template

from react.render import render_component

from .. import app
from ..utils import counter_initializer


@app.route("/")
def index():
    count = counter_initializer(5)
    rendered = render_component(
        os.path.abspath('reactest/frontend/src/index.jsx'))
    return render_template("index.jinja2", count=count, rendered=rendered)
