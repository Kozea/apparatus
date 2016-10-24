VENV = $(PWD)/.env
PIP = $(VENV)/bin/pip
PYTHON = $(VENV)/bin/python
NPM ?= yarn

export PROJECT_NAME = reactest
export STATIC_SERVER = localhost:3000
export FLASK_CONFIG = $(PWD)/$(PROJECT_NAME)/backend/application.cfg

all: install serve

install-node:
	$(NPM) install

install-python:
	test -d $(VENV) || virtualenv $(VENV)
	$(PIP) install --upgrade --no-cache -e .

install: install-node install-python

clean:
	rm -fr dist

clean-install: clean
	rm -fr node_modules

lint:
	$(NPM) run lint

build: clean lint
	NODE_ENV=production $(NPM) run build

SERVE_PYTHON = $(PYTHON) $(PROJECT_NAME)/backend/__init__.py
serve-python:
	$(SERVE_PYTHON)

SERVE_STATIC = $(NPM) run start
serve-static:
	$(SERVE_STATIC)

serve:
	($(SERVE_PYTHON)) & ($(SERVE_STATIC)) & wait
