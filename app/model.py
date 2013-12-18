from app import app

relationship = app.db.relationship
Model = app.db.Model


class ClientType(Model):
    __tablename__ = 'client_type'


class Client(Model):
    __tablename__ = 'client'
    type = relationship('ClientType')


class Person(Model):
    __tablename__ = 'person'
    companies = relationship('Client', secondary='work', backref='people')
    roles = relationship('Role', secondary='work', backref='persons')


class Role(Model):
    __tablename__ = 'role'


class Work(Model):
    __tablename__ = 'work'
    role = relationship('Role', backref='works')
    person = relationship('Person', backref='works')
    client = relationship('Client', backref='works')
