export function getAllAlbumData(endpoint, albums = []) {
  return fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      albums = albums.concat(...data.data);
      if (data.links.next !== undefined) {
        return getAllAlbumData(data.links.next, albums);
      }
      else {
        return albums;
      }
    })
    .catch(function(err) {
      console.log("Error connecting to API");
      console.log(err);
    });
};