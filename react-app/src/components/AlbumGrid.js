import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Album from './Album';

const AlbumGridWrapper = styled.div`
 //width: 30%;
 //float: left;
`;

class AlbumGrid extends React.Component {
  render() {
    return(
      <div>
        {Object.keys(this.props.albums).slice(0,this.props.rows).map(key =>
          <AlbumGridWrapper key={key}>
            <Album
              title={this.props.albums[key].attributes.title}
              albumId={this.props.albums[key].attributes.field_spotify_album_id}
              coverImage={this.props.albums[key].attributes.field_cover_image}
            />
          </AlbumGridWrapper>
        )}
      </div>
    )
  }
}

AlbumGrid.propTypes = {
  albums: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired
};

export default AlbumGrid;
