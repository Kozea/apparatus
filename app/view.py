from app import nuts
from app.model import Client, ClientType
from wtforms import TextField, TextAreaField
from wtforms.ext.sqlalchemy.fields import QuerySelectField
from wtforms.validators import Required


class BaseView(nuts.ModelView):
    view_list_template = 'pynuts/list.jinja2'
    view_table_template = 'pynuts/table.jinja2'
    view_create_template = 'pynuts/create.jinja2'
    view_read_template = 'pynuts/read.jinja2'
    view_update_template = 'pynuts/update.jinja2'
    view_delete_template = 'pynuts/delete.jinja2'


class BaseForm(object):
    pass


class ClientView(BaseView):
    model = Client

    _cols = ('name', 'address', 'zip', 'city', 'type')
    table_columns = _cols
    create_columns = _cols
    read_columns = _cols
    update_columns = _cols
    list_column = 'name'

    class Form(BaseForm):
        name = TextField('Nom', validators=[Required()])
        address = TextAreaField('Adresse', validators=[Required()])
        zip = TextField('Code postal', validators=[Required()])
        city = TextField('Ville', validators=[Required()])
        type = QuerySelectField(
            'Type', get_label='label', query_factory=lambda: ClientType.query)
