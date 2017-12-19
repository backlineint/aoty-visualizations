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
      'secret'
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

      $search = $api->search($album_title, 'album');

      // Can't find a way to query based on artist and album, so instead we'll
      // check the results to see if we have the correct album.
      foreach ($search->albums->items as $key => $album) {
        if ((strtolower($album->artists[0]->name) == strtolower($artist)) && (strtolower($album->name) == strtolower($album_title))) {
          break;
        }
      }

      $spotify_album_id = $search->albums->items[$key]->id;
      // images[0] would be 640 rather than 300.
      $cover_image = $search->albums->items[$key]->images[2]->url;

      $row->setSourceProperty('artist', $artist);
      $row->setSourceProperty('album_title', $album_title);
      $row->setSourceProperty('spotify_album_id', $spotify_album_id);
      $row->setSourceProperty('cover_image', $cover_image);

      // Don't make the spotify API too mad.
      sleep(1);
    }

    $list_rankings = array();
    // Do we need to default the value to 0 if no value exists?
    $list_rankings[] = "rtrade:" . $row->getSourceProperty('rtrade');
    $list_rankings[] = "rstone:" . $row->getSourceProperty('rstone');
    $list_rankings[] = "q:" . $row->getSourceProperty('q');
    $list_rankings[] = "paste:" . $row->getSourceProperty('paste');
    $list_rankings[] = "nme:" . $row->getSourceProperty('nme');
    $list_rankings[] = "mojo:" . $row->getSourceProperty('mojo');
    $list_rankings[] = "drwnd:" . $row->getSourceProperty('drwnd');
    $list_rankings[] = "cos:" . $row->getSourceProperty('cos');
    $list_rankings[] = "uncut:" . $row->getSourceProperty('uncut');
    $list_rankings[] = "skinny:" . $row->getSourceProperty('skinny');
    $list_rankings[] = "cmplx:" . $row->getSourceProperty('cmplx');
    $list_rankings[] = "crack:" . $row->getSourceProperty('crack');
    $list_rankings[] = "gvsb:" . $row->getSourceProperty('gvsb');
    $list_rankings[] = "noisey:" . $row->getSourceProperty('noisey');
    $list_rankings[] = "quietus:" . $row->getSourceProperty('quietus');
    $list_rankings[] = "strgum:" . $row->getSourceProperty('strgum');
    $list_rankings[] = "uproxx:" . $row->getSourceProperty('uproxx');
    $list_rankings[] = "vnlfct:" . $row->getSourceProperty('vnlfct');
    $list_rankings[] = "wire:" . $row->getSourceProperty('wire');
    $list_rankings[] = "popmat:" . $row->getSourceProperty('popmat');
    $list_rankings[] = "pfork:" . $row->getSourceProperty('pfork');
    $list_rankings[] = "npr:" . $row->getSourceProperty('npr');

    $row->setSourceProperty('list_rankings', $list_rankings);

    // Pick up - get all lists in and commit.

    return parent::prepareRow($row);
  }
}