HOST ?= 0.0.0.0
ASSETS_PORT ?= 1666
SERVER_PORT ?= 16660
API_PORT ?= 16661

export API_SERVER = $(HOST):$(API_PORT)
export ASSETS_SERVER = $(HOST):$(ASSETS_PORT)
export SERVER = $(HOST):$(SERVER_PORT)
export FLASK_APP ?= $(PWD)/lib/backend/__init__.py
export FLASK_CONFIG ?= $(PWD)/lib/backend/application.cfg
export FLASK_TEST_CONFIG ?= $(PWD)/lib/backend/application-test.cfg
export FLASK_DEBUG ?= 1

# Python env
PYTHON_VERSION ?= python
PIPENV ?= $(shell command -v pipenv 2> /dev/null)
VENV = $(PWD)/.venv
export PIPENV_VENV_IN_PROJECT = 1

# Node env
NODE_MODULES = $(PWD)/node_modules
NPM ?= $(shell command -v yarn 2> /dev/null)

URL_TEST_API = https://test-$(CI_PROJECT_NAME)-$(BRANCH_NAME).kozea.fr/api/date.json
