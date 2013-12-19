begin;

insert into client_type (client_type_id, identifier, label) values (1, 'research', 'Research corporation');
insert into client_type (client_type_id, identifier, label) values (2, 'military', 'Military branch');

insert into client (client_id, client_type_id, name, address, zip, city) values (1, 1, 'Black Mesa', 'New Mexico State Road 502', 'NM502', 'New Mexico');
insert into client (client_id, client_type_id, name, address, zip, city) values (2, 1, 'Aperture Science', 'Old salt mine', '906201', 'Upper Michigan');
insert into client (client_id, client_type_id, name, address, zip, city) values (3, 2, 'Black Ops', 'Unknown', 'N/A', 'Somewhere in US');

insert into person (person_id, name, firstname, login, password, email, gender, birthdate) values (1, 'Gordon', 'Freeman', 'gfreeman', 'crowbar', 'gfreeman@blackmesa.com', 'Man', '1982-10-14');
insert into person (person_id, name, firstname, login, password, email, gender, birthdate) values (2, 'Kleiner', 'Isaac', 'ikleiner', 'glass', 'ikleiner@blackmesa.com', 'Man', '1948-03-17');
insert into person (person_id, name, firstname, login, password, email, gender, birthdate) values (3, 'Doctor', 'Rosenberg', 'drosenberg', 'suv', 'drosenberg@blackmesa.com', 'Man', '1971-11-07');

insert into person (person_id, name, firstname, login, password, email, gender, birthdate) values (4, 'Cave', 'Johnson', 'cjohnson', 'caroline', 'cjohnson@aperture.com', 'Man', '1923-10-30');
insert into person (person_id, name, firstname, login, password, email, gender, birthdate) values (5, 'Secretary', 'Caroline', 'scaroline', 'johnson', 'caroline@aperture.com', 'Woman', '1945-02-07');
insert into person (person_id, name, firstname, login, password, email, gender, birthdate) values (6, 'Test Subject', 'Chell', 'tchell', 'TheCakeIsALie', 'tchell@aperture.com', 'Woman', '1980-07-12');

insert into role (role_id, identifier, label) values (1, 'scientist', 'Scientist');
insert into role (role_id, identifier, label) values (2, 'scientist_leader', 'Scientist Leader');
insert into role (role_id, identifier, label) values (3, 'secretary', 'secretary');
insert into role (role_id, identifier, label) values (4, 'ceo', 'CEO');
insert into role (role_id, identifier, label) values (5, 'test_subject', 'Test Subject');
insert into role (role_id, identifier, label) values (6, 'main_character', 'Main Character');


insert into work (work_id, person_id, client_id, role_id) values (1, 1, 1, 1);
insert into work (work_id, person_id, client_id, role_id) values (2, 1, 1, 4);
insert into work (work_id, person_id, client_id, role_id) values (3, 2, 1, 1);
insert into work (work_id, person_id, client_id, role_id) values (4, 3, 1, 2);
insert into work (work_id, person_id, client_id, role_id) values (5, 3, 2, 1);
insert into work (work_id, person_id, client_id, role_id) values (6, 4, 2, 1);
insert into work (work_id, person_id, client_id, role_id) values (7, 4, 2, 4);
insert into work (work_id, person_id, client_id, role_id) values (8, 5, 2, 3);
insert into work (work_id, person_id, client_id, role_id) values (9, 6, 2, 5);
insert into work (work_id, person_id, client_id, role_id) values (10, 6, 2, 6);

CREATE OR replace function update_all_the_sequences() RETURNS VOID AS
$$
 DECLARE
 line record;
 stmt TEXT;
 new_value int;
 BEGIN
   FOR line in 
     SELECT d.adsrc, a.attname, c.oid::regclass as tname, substring(d.adsrc FROM 'nextval\(''([^'']*)''::regclass\)') as seq_name
     FROM pg_attribute a 
     inner join pg_class c on c.oid = a.attrelid
     inner join pg_attrdef d on d.adnum = a.attnum AND a.attrelid = d.adrelid
     WHERE a.attisdropped = FALSE
     AND d.adsrc ~ 'nextval\(''[^'']*''::regclass\)'
   LOOP
     stmt := 'SELECT pg_catalog.setval(''' || line.seq_name|| ''', max_id, true) ' ||
             'FROM (SELECT max(' || line.attname || ') as max_id FROM ' || line.tname ||
               ' ) as t;';
     EXECUTE stmt;
   END LOOP;
 END;
$$ language plpgsql;
select update_all_the_sequences();
DROP function update_all_the_sequences();
commit;
