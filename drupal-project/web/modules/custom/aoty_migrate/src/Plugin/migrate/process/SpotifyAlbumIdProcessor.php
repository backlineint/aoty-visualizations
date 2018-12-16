<?php

namespace Drupal\aoty_migrate\Plugin\migrate\process;

use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;

/**
 * Get the Spotify Album ID based on album title.
 *
 *
 * @MigrateProcessPlugin(
 *   id = "spotify_album_id_processor"
 * )
 *
 * * @code
 * process:
 *     field_spotify_album_id:
 *       plugin: spotify_album_id_processor
 *       source:
 *        - title
 * @endcode
 */
class SpotifyAlbumIdProcessor extends ProcessPluginBase {

  public function transform($values, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {

    // Example process plugin

    $artist_and_title = explode('-', $values[0]);

    return ltrim($artist_and_title[1]);

  }

}
