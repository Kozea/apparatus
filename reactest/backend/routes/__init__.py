from flask import render_template

from .. import app
from ..utils import counter_initializer, render_component


@app.route("/")
def index():
    count = counter_initializer(5)
    rendered = render_component('frontend/src/index.jsx')
    return render_template("index.jinja2", count=count, rendered=rendered)
