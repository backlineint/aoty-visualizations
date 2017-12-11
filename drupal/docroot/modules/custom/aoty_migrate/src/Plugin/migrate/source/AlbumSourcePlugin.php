<?php

namespace Drupal\aoty_migrate\Plugin\migrate\source;

use Drupal\migrate_plus\Plugin\migrate\source\Url;
use Drupal\migrate\Row;
use SpotifyWebAPI;

/**
* Source plugin for retrieving data via URLs.
*
* @MigrateSource(
*   id = "album_source_plugin"
* )
*/

class AlbumSourcePlugin extends Url  {

  /**
  * {@inheritdoc}
  */
  public function prepareRow(Row $row) {

    // TODO - Store Secret in Config
    $session = new SpotifyWebAPI\Session(
      '9fe9bff24f2a46cd8c76b7378ea1160a',
      'SECRET GOES HERE'
    );

    $session->requestCredentialsToken();

    // TODO - Can we store token somewhere so we can re-use it?
    // Try https://atendesigngroup.com/blog/storing-session-data-drupal-8

    $accessToken = $session->getAccessToken();

    $api = new SpotifyWebAPI\SpotifyWebAPI();
    $api->setAccessToken($accessToken);

    if ($row->hasSourceProperty('album')) {
      $album = $row->getSourceProperty('album');
      $artist_and_title = explode(' - ', $album);
      $artist = $artist_and_title[0];
      $album_title = $artist_and_title[1];

      //print "Title: " . $album_title . PHP_EOL;

      // Could we add artist and album to query?
      // Or can we just hardcode some corrections to the searches here?
      $search = $api->search($album_title, 'album');
      $spotify_album_id = $search->albums->items[0]->id;
      // images[0] would be 640 rather than 300.
      $cover_image = $search->albums->items[0]->images[2]->url;

      $row->setSourceProperty('artist', $artist);
      $row->setSourceProperty('album_title', $album_title);
      $row->setSourceProperty('spotify_album_id', $spotify_album_id);
      $row->setSourceProperty('cover_image', $cover_image);

      // Don't make the spotify API too mad.
      sleep(1);
    }

    return parent::prepareRow($row);
  }
}