import React from 'react';

class AlbumTable extends React.Component {
  render() {
    const albums = this.props.albums;
    const albumIds = Object.keys(albums);
    return (
      <div>
        {albumIds.map((key) => {
          return <p>{albums[key].title}</p>
        })}
      </div>
    )
  }
}

export default AlbumTable;