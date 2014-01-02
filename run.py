#!/usr/bin/env python
from subprocess import Popen
from glob import glob
import time
import shlex

commands = [
    'coffee -wcb -j app/static/javascripts/main.js ' +
    ' '.join(glob('app/static/coffees/*.coffee')),
    'compass watch app/static',
    'python serve.py'
]

process = {}
for cmd in commands:
    print('Lauching %s' % cmd)
    process[cmd] = Popen(shlex.split(cmd))

try:
    while len(process):
        for cmd, proc in list(process.items()):
            if proc.poll():
                print('%s has terminated.' % cmd)
                process.pop(cmd)
        time.sleep(0.1)
    print('All children are dead. Time to go.')

except KeyboardInterrupt:
    print('\nGot [ctrl]+[c]')
    for cmd, proc in process.items():
        print('Killing %s' % cmd)
        proc.kill()
    print('Bye bye.')
