from unrest import UnRest

from .. import app, db
from ..model import Color, Shape

rest = UnRest(app, db.session)
color = rest(Color)
shape = rest(Shape)
