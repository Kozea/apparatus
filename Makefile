include config.Makefile
-include config.custom.Makefile

BASEVERSION ?= v1
BASEROOT ?= https://raw.githubusercontent.com/Kozea/MakeCitron/$(BASEVERSION)/
BASENAME = base.Makefile
ifeq ($(MAKELEVEL), 0)
include $(shell wget -q --show-progress -O $(BASENAME) $(BASEROOT)$(BASENAME) && echo $(BASENAME))
else
include $(BASENAME)
endif


# custom
install-db: install-db-super ## install-db: Install apparatus database 
	$(call target_log)
	psql -U postgres -c "CREATE USER apparatus" ||:
	psql -U postgres -c "CREATE database apparatus owner apparatus" ||:
	$(PIPENV) run flask create_db
	$(PIPENV) run flask insert_data
