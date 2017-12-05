from unrest import UnRest

from .. import app, db
from ..model import Color, Shape

rest = UnRest(app, db.session)
color = rest(Color, methods=['GET', 'POST', 'PUT', 'DELETE'])
shape = rest(Shape, methods=['GET', 'POST', 'PUT', 'DELETE'])
