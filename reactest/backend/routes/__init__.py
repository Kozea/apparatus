from flask import render_template

from .. import app
from ..utils import counter_initializer, render_component


@app.route("/")
@app.route("/starts_with_<int:count>")
def index(count=None):
    if count is not None:
        count = counter_initializer(count)
        state = {
            'count': {
                'start': count,
                'step': 1,
                'val': count
            },
            'messages': [{'id': 1, 'text': 'State from Server!!'}]
        }
    else:
        state = None
    rendered = render_component(
        'frontend/src/components/App.jsx', state=state)
    return render_template(
        "index.jinja2", rendered=rendered, state=state)
