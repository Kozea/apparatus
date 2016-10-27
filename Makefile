export PROJECT_NAME = reactest
export STATIC_SERVER = http://localhost:3000
export FLASK_APP = reactest.backend
export FLASK_CONFIG = $(PWD)/$(PROJECT_NAME)/backend/application.cfg
export FLASK_DEBUG = 1

# Python env
VENV = $(PWD)/.env
PIP = $(VENV)/bin/pip
PYTHON = $(VENV)/bin/python
PYTEST = $(VENV)/bin/py.test
FLASK = $(VENV)/bin/flask

# Node env
NPM ?= yarn


all: install serve

install-node:
	$(NPM) install

install-python:
	test -d $(VENV) || virtualenv $(VENV)
	$(PIP) install --upgrade --no-cache -e .[test]

install: install-node install-python

clean:
	rm -fr dist

clean-install: clean
	rm -fr node_modules

lint-python:
	$(PYTEST) --flake8 -m flake8 reactest
	$(PYTEST) --isort -m isort reactest

lint-node:
	$(NPM) run lint

lint: lint-python lint-node

check-python:
	$(PYTEST) reactest

check-node:
	$(NPM) run test

check: check-python check-node

build: clean lint
	NODE_ENV=production $(NPM) run build

serve-python-with-static:
	# Allow to test static build
	STATIC_SERVER= $(FLASK) run

serve-python:
	$(FLASK) run

serve-static:
	$(NPM) run start

serve:
	set -m; (($(FLASK) run; kill 0)& ($(NPM) run start; kill 0)& wait)
