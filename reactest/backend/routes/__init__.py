from flask import jsonify, render_template

from .. import __version__, app
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
            'messages': [{'id': 1, 'text': 'State from Server!!'}],
            'version': __version__
        }
    else:
        state = None
    rendered = render_component(
        'frontend/src/components/App.jsx', state=state)
    return render_template(
        "index.jinja2", rendered=rendered, state=state)


@app.route("/version.json")
def version():
    return jsonify({
        'version': __version__
    })
