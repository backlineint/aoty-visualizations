import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Album from './Album';
import AlbumDetail from './AlbumDetail';

const AlbumList = styled.ol`
 width: 50%;
 float: left;
 overflow: scroll;
 height: 100vh;
 padding-left: 1px;
 padding-right: .5rem;
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
                title={this.props.albums[key].attributes.title}
                albumId={this.props.albums[key].attributes.field_spotify_album_id}
                coverImage={this.props.albums[key].attributes.field_cover_image}
                selectAlbum={this.props.selectAlbum}
                selectedAlbum={key}
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
