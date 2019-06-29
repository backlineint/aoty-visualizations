// Prepare Data - cleanup data from Drupal to prep for use in App component.

import _orderBy from 'lodash/orderBy';

export default function prepareData(data) {
  const allAlbums = data.allNodeAlbum.nodes
  allAlbums.map((value, key) => {
    value.title_display = value.title;
    value.title = value.title.toLowerCase();
    // Cast ranking values
    value.field_avg = parseFloat(value.field_avg)
    value.field_cons_score = parseFloat(value.field_cons_score)
    // Why parse the ID here?
    value.field_id = parseInt(value.field_id, 10)
    value.field_lists = parseInt(value.field_lists, 10)
    value.field_top_10s = parseInt(value.field_top_10s, 10)
    value.field_wt_avg = parseFloat(value.field_wt_avg)

    // Protect from empty genre fields and lowercase for search
    if (!value.field_genre) {
      value.field_genre = 'n/a';
    }
    else {
      value.field_genre_display = value.field_genre;
      value.field_genre = value.field_genre.toLowerCase();
    }

    // flatten list ranking values
    value.field_list_rankings.forEach(function(list) {
      const listRank = list.split(':');
      // TODO - find a way to handle 0 values rather than this 101/'' hack.
      value[listRank[0] + '_list'] = isNaN(parseInt(listRank[1], 10)) ? 101 : parseInt(listRank[1], 10);
      value[listRank[0]] = isNaN(parseInt(listRank[1], 10)) ? '' : parseInt(listRank[1], 10);
    })
    return value
  })
  const filteredAlbums = _orderBy([...allAlbums], 'field_cons_score', 'asc').slice(0, 50)
  return {
    allAlbums,
    filteredAlbums
  }
}