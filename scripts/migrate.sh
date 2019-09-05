#!/bin/sh

lando drush si -y
lando drush en -y aoty_migrate
lando drush migrate-import --group=aoty -y
# If you want to limit for testing purposes...
# drush migrate-import --group=aoty --limit=50 -y
