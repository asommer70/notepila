#!/bin/bash
#
# Create MariaDB databases using straight up SQL statements.
#

# Check for the jq utility.
which jq >> /dev/null
RES=$?
if [ $RES -eq 1 ]; then
  echo "Please install the jq utility... https://stedolan.github.io/jq/"
  exit 1
fi

mysql -u root -e "create database $(jq -r '.development.database' config/config.json)";
mysql -u root -e "create database $(jq -r '.test.database' config/config.json)";
# mysql -u root -e "create database $(jq -r '.production.database' config/config.json)";

mysql -u root -e "grant all on $(jq -r '.test.database' config/config.json).* to $(jq -r '.test.username' config/config.json)@localhost identified by $(jq '.test.password' config/config.json);"
mysql -u root -e "grant all on $(jq -r '.development.database' config/config.json).* to $(jq '.development.username' config/config.json)@localhost identified by $(jq '.developmentest.password' config/config.json);"
# mysql -u root -e "grant all on $(jq -r '.production.database' config/config.json).* to $(jq '.production.username' config/config.json)@localhost identified by $(jq '.production.password' config/config.json);"
