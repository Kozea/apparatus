from datetime import datetime

from flask import jsonify

from .. import app


@app.route('/api/date.json')
def user():
    return jsonify({'date': datetime.now().timestamp()})
