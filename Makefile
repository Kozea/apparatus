include MakeCitron.Makefile


install-db: install-db-super ## install-db: Install apparatus database
	$(LOG)
	psql -U postgres -c "CREATE USER apparatus" ||:
	psql -U postgres -c "CREATE database apparatus owner apparatus" ||:
	flask create-db
	flask insert-data
