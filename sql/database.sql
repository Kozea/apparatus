create user apparatus;
create database apparatus owner apparatus;
\c apparatus apparatus

create table client_type (
       client_type_id serial primary key,
       identifier varchar unique not null,
       label varchar not null
);

create table client (
       client_id serial primary key,
       client_type_id integer references client_type(client_type_id) not null,
       name varchar not null,
       address varchar not null,
       zip varchar not null,
       city varchar not null
);

create table person (
       person_id serial primary key,
       name varchar not null,
       firstname varchar not null,
       login varchar unique not null,
       password varchar not null,
       email varchar not null,
       gender varchar,
       birthdate date
);

create table role (
       role_id serial primary key,
       identifier varchar unique not null,
       label varchar not null
);

create table work (
       work_id serial primary key,
       person_id integer references person(person_id) on delete cascade not null,
       client_id integer references client(client_id) on delete cascade not null,
       role_id integer references role(role_id) not null
);
