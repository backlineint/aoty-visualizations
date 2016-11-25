#!/bin/sh

cd ../drupal
drush si -y
drush upwd admin --password=admin
drush sql-query "TRUNCATE shortcut"
drush sql-query "TRUNCATE shortcut_field_data"
drush cset system.site uuid 1776e283-a34a-4641-b993-3ac6730ff940 -y
drush cim sync -y
drush migrate-import --group=aoty -y
