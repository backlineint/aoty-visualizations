import * as SpotifyWebApi from 'spotify-web-api-js';

let s = new SpotifyWebApi();

// Todo - figure out how to manage the key here...
s.setAccessToken('TOKEN GOES HERE');

export function getAlbumImage(title) {
  const myData = s.searchAlbums(title, {limit: 10})
    .then(function(data) {
      console.log('Album information', data);
      return data.albums.items[0].images[1].url;
    }, function(err) {
      console.error(err);
    });
  myData.then(data => {
    // Data is now the cover image
    console.log('Cover image:', data);
  });
}