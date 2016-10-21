PROJECT_NAME = reactest
STATIC_SERVER = localhost:3000
FLASK_CONFIG = $(PWD)/$(PROJECT_NAME)/backend/application.cfg
VENV = $(PWD)/.env
PIP = $(VENV)/bin/pip
PYTHON = $(VENV)/bin/python
NPM ?= yarn

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

SERVE_PYTHON = STATIC_SERVER=$(STATIC_SERVER) FLASK_CONFIG=$(FLASK_CONFIG) $(PYTHON) $(PROJECT_NAME)/backend/__init__.py
serve-python:
	$(SERVE_PYTHON)

SERVE_STATIC = STATIC_SERVER=$(STATIC_SERVER) $(NPM) run start
serve-static:
	$(SERVE_STATIC)

serve:
	($(SERVE_PYTHON)) & ($(SERVE_STATIC)) & wait
