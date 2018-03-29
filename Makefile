include config.Makefile
-include config.custom.Makefile

BASEVERSION ?= v1
BASEROOT ?= https://raw.githubusercontent.com/Kozea/MakeCitron/$(BASEVERSION)/
BASENAME := base.Makefile
ifeq ($(MAKELEVEL), 0)
RV := $(shell wget -O $(BASENAME) $(BASEROOT)$(BASENAME) 2>&1)
ifeq (0,$(.SHELLSTATUS))
include $(BASENAME)
else
$(error Unable to download $(BASEROOT)$(BASENAME): $(RV))
endif
$(info $(INFO))
else
include $(BASENAME)
endif


install-db: install-db-super ## install-db: Install apparatus database
	$(LOG)
	psql -U postgres -c "CREATE USER apparatus" ||:
	psql -U postgres -c "CREATE database apparatus owner apparatus" ||:
	$(PIPENV) run flask create_db
	$(PIPENV) run flask insert_data
