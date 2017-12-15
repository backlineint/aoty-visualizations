import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AlbumContainer = styled.div`
 width: 50%;
 float: left;
 padding-left: 1rem;
`;

class AlbumDetail extends React.Component {
  render() {
    return(
      <AlbumContainer>
        <img
          src={this.props.album.field_cover_image}
          alt={this.props.album.title}
        />
        {this.props.album.title}
        <a href={'https://open.spotify.com/album/' + this.props.album.field_spotify_album_id} target="_blank">Play on Spotify</a>
      </AlbumContainer>
    )
  }
}

AlbumDetail.propTypes = {
  album: PropTypes.object.isRequired
};

export default AlbumDetail;