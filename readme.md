# Album of the Year List Project Visualizations

Migrates data from a Google Spreadsheet into a Drupal instance that serves as an
API for a React app built using Gatsby. Hopefully provides a fun way to experiment 
with the awesome Album of the Year List Project data and discover new music.

Visualizations based on data from http://robmitchum.github.io/aotysheets.html

App available here: http://brianperryinteractive.com/aoty-visualizations/

Storybook available here: http://brianperryinteractive.com/aoty-storybook/ 

## Local Environment Setup

Prerequisites:

* Lando - https://lando.dev/
* NodeJS - https://nodejs.org

Run the install script using:

`./scripts/install.sh`

This will create a Drupal instance with initial seed data available at
http://aoty.lndo.site and will run Gatsby in develop mode at http://localhost:8000/

To stop the running Drupal instance run:

`lando stop`

To restart the Drupal instance and run Gatsby in develop mode run:

`lando start`
`cd gatsby`
`npm run develop`

## Slides and Talks

Full slides available here: http://brianperryinteractive.com/aoty-slides/
(or [PDF version](https://www.dropbox.com/s/ccl8n6f6kxbjcgw/hot-jam-stack.pdf?dl=0) 
note: doesn't contain all dynamic content)

The talk 'Hot JAMS(tack): Building a Music Discovery App with Drupal and React' 
has been presented at:
* [Design 4 Drupal](https://design4drupal.org/sessions/case-studypanel/hot-jamstack-building-music-discovery-app-drupal-and-react) - June 27, 2019. [Video](https://www.youtube.com/watch?v=BwUbyyqDxI4). 
Reunion tour edition - updates on what has changed in the Decoupled Drupal and 
React landscape since the app was originally built.  
* [MidCamp Chicago](https://www.midcamp.org/topic/hot-jamstack-lessons-building-music-discovery-app-drupal-and-react) - March 10, 2018. [Video](https://www.youtube.com/watch?v=Sj_nE2IukOs).  
* [DrupalCon Nashville](https://events.drupal.org/nashville2018/sessions/hot-jamstack-building-music-discovery-app-drupal-and-react) - April 11, 2018 - [Video](https://www.youtube.com/watch?v=d0HOsc5nQtM).
* [Texas Camp](https://2018.texascamp.org/sessions/hot-jamstack-building-a-music-discovery-app-with-drupal-and-react) - June 1, 2018 - [Video](https://www.youtube.com/watch?v=ZzDs3hGx3zY).

Related talk 'Storybook: An Interactive Pattern Library for Your Decoupled Applications' has been presented at:
* [Design 4 Drupal](https://www.design4drupal.org/sessions/uivisual-design/storybook-interactive-pattern-library-your-decoupled-applications) - June 28, 2018. 
* [Drupal GovCon](https://www.drupalgovcon.org/2018/program/sessions/storybook-interactive-pattern-library-your-decoupled-applications) - August 24, 2018 - [Video](https://www.youtube.com/watch?v=ZzDs3hGx3zY).

Slides: http://brianperryinteractive.com/storybook-slides

## Migration

Migration of album of the year data can be run manually by enabling the aoty_migrate
module:

`lando drush en aoty_migrate`

You'll also need to specify your own SpotifyWebAPI credentials in 
drupal-project/web/modules/custom/aoty_migrate/src/Plugin/migrate/source/AlbumSourcePlugin.php
(This will be made configurable via Drupal at some point...)

and then running:

`lando drush migrate-import --group=aoty -y`

## Older versions

The previous version of this project can be checked out using the `1.0` tag. 1.0 
contains a Drupal instance based on the (now deprecated) Reservoir Drupal 
Distribution and a React app that interacts with Drupal's API on app load.
