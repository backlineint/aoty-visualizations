#!/bin/sh

cd ../drupal/docroot
drush si -y
drush upwd admin --password=admin
drush en -y aoty_migrate
drush migrate-import --group=aoty -y
