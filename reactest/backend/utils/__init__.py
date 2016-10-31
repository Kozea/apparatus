import os
from json import dumps, loads
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from flask import current_app


def counter_initializer(i: int) -> int:
    return abs(i)


class ReactError(Exception):
    pass


def render_component(filename, **kwargs):
    path = os.path.join(current_app.root_path, '..', filename)
    if not os.path.exists(path):
        raise ValueError('%s does not exists' % path)

    data = {
        'path': path
    }

    request = Request(
        '%s/render' % current_app.config['RENDER_SERVER'],
        dumps(data).encode('utf-8'), {
            'Content-Type': 'application/json'
        })

    response = urlopen(request)
    if response.status != 200:
        raise HTTPError('[ERROR %d] %s' % (response.status, response.read()))
    response = response.read()

    rv = loads(response.decode('utf-8'))

    if rv.get('error'):
        error = rv['error']
        if 'stack' in error:
            raise ReactError(error['stack'])
        raise ReactError(error)

    if not rv.get('markup'):
        raise ReactError('No markup rendered %s' % rv)

    return rv['markup']
