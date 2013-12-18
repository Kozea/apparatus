from . import app
from .view import ClientView
from flask import render_template

@app.route("/")
def index():
    return render_template('index.jinja2')


@ClientView.list_page
@app.route('/clients/list')
def client_list():
    return ClientView().list('clients/list.jinja2')


@ClientView.table_page
@app.route('/clients/table')
def client_table():
    return ClientView().table('clients/table.jinja2')


@ClientView.create_page
@app.route('/clients/create', methods=('GET', 'POST'))
def client_create():
    return ClientView().create('clients/create.jinja2')


@ClientView.read_page
@app.route('/clients/<int:client_id>/read')
def client_read(client_id):
    return ClientView(client_id).read('clients/read.jinja2')


@ClientView.update_page
@app.route('/clients/<int:client_id>/update', methods=('GET', 'POST'))
def client_update(client_id):
    return ClientView(client_id).update('clients/update.jinja2')


@ClientView.delete_page
@app.route('/clients/<int:client_id>/delete', methods=('GET', 'POST'))
def client_delete(client_id):
    return ClientView(client_id).delete('clients/delete.jinja2')
