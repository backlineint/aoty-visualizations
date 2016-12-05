---
layout: post
title:  "Importing json Data in Drupal 8"
date:   2016-11-16 21:51:06 -0600
categories: migration
---
The initial challenge seems to be finding a the right way to import json data into a Drupal 8 site.  Never thought I'd say this, but I miss Feeds.

One option would be to write a custom module that uses Guzzle since that is now a Drupal dependency.  Ideally, I'd like to avoid custom module development where possible.

Another alternative is creating a migration, which is the approach I think I'm going to take.

A couple of relevant migration examples:
* [https://www.drupal.org/docs/8/upgrade/using-the-migrate-source-csv-plugin](https://www.drupal.org/docs/8/upgrade/using-the-migrate-source-csv-plugin)
* [http://www.jeffgeerling.com/blog/2016/migrate-custom-json-feed-drupal-8-migrate-source-json](http://www.jeffgeerling.com/blog/2016/migrate-custom-json-feed-drupal-8-migrate-source-json)

Getting a live json export of a Google sheet takes a little doing as well. Requires publishing it to the web.  The following resources seem helpful:
* [http://stackoverflow.com/questions/30082277/accessing-a-new-style-public-google-sheet-as-json](http://stackoverflow.com/questions/30082277/accessing-a-new-style-public-google-sheet-as-json)
* [https://coderwall.com/p/duapqq/use-a-google-spreadsheet-as-your-json-backend](https://coderwall.com/p/duapqq/use-a-google-spreadsheet-as-your-json-backend)
