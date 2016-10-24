from flask import render_template
from .. import app
from ..utils import counter_initializer


@app.route("/")
def index():
    count = counter_initializer(5)
    return render_template("index.jinja2", count=count)
