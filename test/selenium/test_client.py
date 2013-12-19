
def test_client_table(s, db):
    s.go('/clients/table')
    assert len(s('main table tbody tr')) == 3
    s('main table tbody tr td') == [
        'Black Ops', 'Unknown', 'N/A', 'Somewhere in US', 'Military branch',
        'View', 'Edit', 'Delete',
        'Black Mesa', 'New Mexico State Road 502', 'NM502',
        'New Mexico', 'Research corporation',
        'View', 'Edit', 'Delete',
        'Aperture Science lol', 'Old salt mine', '906201',
        'Upper Michigan', 'Research corporation'
        'View', 'Edit', 'Delete'
    ]


def test_client_add(s, db):
    s.go('/clients/table')
    assert len(s('main table tbody tr')) == 3
    s.go('/clients/create')
    s('input[name=name]').send_keys('NewClientName')
    s('textarea[name=address]').send_keys('NewClientAddress')
    s('input[name=zip]').send_keys('NewClientZip')
    s('input[name=city]').send_keys('NewClientCity')
    s('input[type=submit]').click()
    assert s('.page-header h1').text == ['Client Read']
    s.go('/clients/table')
    assert len(s('main table tbody tr')) == 4
