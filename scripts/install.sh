#!/bin/sh
lando start
lando composer install
curl -L -o aoty-seed.sql.gz https://www.dropbox.com/s/21hgc9hn6h1v8wi/aoty-seed.sql.gz?dl=1
lando db-import aoty-seed.sql.gz
cd gatsby
npm install
npm run develop