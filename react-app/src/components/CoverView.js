import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Album from './Album';
import AlbumDetail from './AlbumDetail';

const AlbumList = styled.ol`
 width: 60%;
 float: left;
 overflow: scroll;
 height: 91vh;
 padding-left: 1px;
 padding-right: 1.5rem;
 margin-top: 0;
`;

class CoverView extends React.Component {
  render() {
    if (this.props.albums.length > 0) {
      return (
        <div>
          <AlbumList>
            {Object.keys(this.props.albums).slice(0, this.props.rows).map(key =>
              <Album
                key={key}
                artist={this.props.albums[key].attributes.field_artist}
                title={this.props.albums[key].attributes.field_album}
                albumId={this.props.albums[key].attributes.field_spotify_album_id}
                coverImage={this.props.albums[key].attributes.field_cover_image}
                selectAlbum={this.props.selectAlbum}
                selectedAlbum={key}
                activeAlbum={this.props.selectedAlbum === key}
              />
            )}
          </AlbumList>
          <AlbumDetail
            album={this.props.albums[this.props.selectedAlbum].attributes}
          />
        </div>
      )
    }
    else {
      return (
        <div>
          Search returned no results. Maybe no one likes your favorite album?
        </div>
      )
    }
  }
}

CoverView.propTypes = {
  albums: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired,
  selectedAlbum: PropTypes.string.isRequired,
  selectAlbum: PropTypes.func.isRequired
};

export default CoverView;
