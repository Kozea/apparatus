
def test_index(s, db):
    s.go('/')

    assert 'Apparatus' in s.title
    li = s('ul.nav > li')
    assert len(li) == 3
    assert li.text == ['Index', 'Client', 'Person']
    clients = li[1]
    clients.click()
    assert clients('li').text == [
        'List',
        'Table',
        'Create',
        '',
        'Read',
        'Black Ops',
        'Black Mesa',
        'Aperture Science',
        '',
        'Update',
        'Black Ops',
        'Black Mesa',
        'Aperture Science',
        '',
        'Delete',
        'Black Ops',
        'Black Mesa',
        'Aperture Science'
    ]

    persons = li[2]
    persons.click()
    assert persons('li').text == [
        'List',
        'Table',
        'Create',
        '',
        'Read',
        'Gordon',
        'Kleiner',
        'Doctor',
        'Cave',
        'Secretary',
        'Test Subject',
        '',
        'Update',
        'Gordon',
        'Kleiner',
        'Doctor',
        'Cave',
        'Secretary',
        'Test Subject',
        '',
        'Delete',
        'Gordon',
        'Kleiner',
        'Doctor',
        'Cave',
        'Secretary',
        'Test Subject'
    ]
