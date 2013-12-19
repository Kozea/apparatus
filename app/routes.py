from . import app
from .view import ClientView, PersonView
from flask import render_template

@app.route("/")
def index():
    return render_template('index.jinja2')

# Client crud

@ClientView.list_page
@app.route('/clients/list')
def client_list():
    return ClientView().list('page/list.jinja2')


@ClientView.table_page
@app.route('/clients/table')
def client_table():
    return ClientView().table('page/table.jinja2')


@ClientView.create_page
@app.route('/clients/create', methods=('GET', 'POST'))
def client_create():
    return ClientView().create('page/create.jinja2')


@ClientView.read_page
@app.route('/clients/<int:client_id>/read')
def client_read(client_id):
    return ClientView(client_id).read('page/read.jinja2')


@ClientView.update_page
@app.route('/clients/<int:client_id>/update', methods=('GET', 'POST'))
def client_update(client_id):
    return ClientView(client_id).update('page/update.jinja2')


@ClientView.delete_page
@app.route('/clients/<int:client_id>/delete', methods=('GET', 'POST'))
def client_delete(client_id):
    return ClientView(client_id).delete('page/delete.jinja2')


# Person crud
@PersonView.list_page
@app.route('/persons/list')
def person_list():
    return PersonView().list('page/list.jinja2')


@PersonView.table_page
@app.route('/persons/table')
def person_table():
    return PersonView().table('page/table.jinja2')


@PersonView.create_page
@app.route('/persons/create', methods=('GET', 'POST'))
def person_create():
    return PersonView().create('page/create.jinja2')


@PersonView.read_page
@app.route('/persons/<int:person_id>/read')
def person_read(person_id):
    return PersonView(person_id).read('page/read.jinja2')


@PersonView.update_page
@app.route('/persons/<int:person_id>/update', methods=('GET', 'POST'))
def person_update(person_id):
    return PersonView(person_id).update('page/update.jinja2')


@PersonView.delete_page
@app.route('/persons/<int:person_id>/delete', methods=('GET', 'POST'))
def person_delete(person_id):
    return PersonView(person_id).delete('page/delete.jinja2')
