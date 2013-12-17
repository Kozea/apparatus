from app import nuts
from app.model import Table

class BaseView(nuts.ModelView):
    pass


class BaseForm(object):
    pass


class TableView(BaseView):
    model = Table

    class Form(BaseForm):
        pass
