from app import nuts
from app.model import Client, ClientType, Person
from wtforms import (TextField, TextAreaField,
                     PasswordField, DateField, SelectField)
from wtforms.ext.sqlalchemy.fields import QuerySelectField
from wtforms.validators import Required, Optional
from wtforms.widgets import PasswordInput
from sqlalchemy.util import classproperty


class BaseView(nuts.ModelView):
    view_list_template = 'pynuts/list.jinja2'
    view_table_template = 'pynuts/table.jinja2'
    view_create_template = 'pynuts/create.jinja2'
    view_read_template = 'pynuts/read.jinja2'
    view_update_template = 'pynuts/update.jinja2'
    view_delete_template = 'pynuts/delete.jinja2'

    @classproperty
    def _name(cls):
        return cls.__name__.replace('View', '')


class BaseForm(object):
    pass


class ClientView(BaseView):
    model = Client

    _cols = ('name', 'address', 'zip', 'city', 'type')
    list_column = 'name'
    table_columns = _cols
    create_columns = _cols
    read_columns = _cols
    update_columns = _cols

    class Form(BaseForm):
        name = TextField('Name', validators=[Required()])
        address = TextAreaField('Address', validators=[Required()])
        zip = TextField('Area code', validators=[Required()])
        city = TextField('City', validators=[Required()])
        type = QuerySelectField(
            'Type', get_label='label', query_factory=lambda: ClientType.query)


class PersonView(BaseView):
    model = Person

    _cols = ('name', 'firstname', 'login', 'password',
             'email', 'gender', 'birthdate')
    list_column = 'name'
    table_columns = _cols
    create_columns = _cols
    read_columns = _cols
    update_columns = _cols

    class Form(BaseForm):
        name = TextField(
            'Name', validators=[Required()])
        firstname = TextField('Firstname', validators=[Required()])
        login = TextField('Login', validators=[Required()])
        password = PasswordField(
            'Password', validators=[Required()],
            # /!\ This is for testing purpose only !
            widget=PasswordInput(False))
        email = TextField('Email', validators=[Required()])
        gender = SelectField(
            'Gender', choices=(('Man', 'Man'), ('Woman', 'Woman')),
            validators=[Required()])
        birthdate = DateField(
            'Birthdate', format='%d/%m/%Y', validators=[Optional()])
