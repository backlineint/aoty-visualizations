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

      // Would stripping the '-' make the query any more accurate?
      $search = $api->search($album, 'album');

      $spotify_album_id = $search->albums->items[0]->id;
      // images[0] would be 640 rather than 300.
      $cover_image = $search->albums->items[0]->images[2]->url;
      $cover_image_large = $search->albums->items[0]->images[1]->url;

      $row->setSourceProperty('artist', $artist);
      $row->setSourceProperty('album_title', $album_title);
      $row->setSourceProperty('spotify_album_id', $spotify_album_id);
      $row->setSourceProperty('cover_image', $cover_image);
      $row->setSourceProperty('cover_image_large', $cover_image_large);

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
    $list_rankings[] = "spin:" . $row->getSourceProperty('spin');
    $list_rankings[] = "line:" . $row->getSourceProperty('line');
    $list_rankings[] = "tmt:" . $row->getSourceProperty('tmt');
    $list_rankings[] = "altern:" . $row->getSourceProperty('altern');
    $list_rankings[] = "fact:" . $row->getSourceProperty('fact');
    $list_rankings[] = "billbrd:" . $row->getSourceProperty('billbrd');
    $list_rankings[] = "mscomh:" . $row->getSourceProperty('mscomh');
    $list_rankings[] = "405:" . $row->getSourceProperty('405');
    $list_rankings[] = "blare:" . $row->getSourceProperty('blare');
    $list_rankings[] = "earbud:" . $row->getSourceProperty('earbud');
    $list_rankings[] = "giitv:" . $row->getSourceProperty('giitv');
    $list_rankings[] = "treble:" . $row->getSourceProperty('treble');
    $list_rankings[] = "vinfac:" . $row->getSourceProperty('treble');
    $list_rankings[] = "guard:" . $row->getSourceProperty('treble');

    $row->setSourceProperty('list_rankings', $list_rankings);

    // Pick up - get all lists in and commit.

    return parent::prepareRow($row);
  }
}