#!/usr/bin/env python

import sys

from setuptools import find_packages, setup

# Private
if 'register' in sys.argv or 'upload' in sys.argv:
    print('Private package')
    sys.exit(1)

__version__ = "0.0.1"

tests_requirements = [
    'pytest-runner', 'pytest-cov', 'pytest-flake8', 'pytest-isort', 'pytest'
]

setup(
    name="apparatus",
    version=__version__,
    description="Apparatus",
    author="Florian Mounier",
    author_email="florian.mounier@kozea.fr",
    packages=find_packages(),
    include_package_data=True,
    install_requires=["Flask", "SQLAlchemy", "psycopg2-binary", "unrest"],
    provides=["apparatus"],
    setup_requires=['pytest-runner'],
    test_requires=tests_requirements,
    extras_require={
        'test': tests_requirements
    }
)
