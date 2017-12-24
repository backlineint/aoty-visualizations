import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Ranking from './Ranking';

const AlbumContainer = styled.div`
 width: 40%;
 float: left;
 padding-left: 1rem;
 overflow: hidden;
 overflow-wrap: break-word;
 hyphens: auto;
 .pt-callout {
   max-width: 324px;
 }
 h4 {
   color: dodgerblue;
 }
 img {
   max-width: 100%;
 }
`;

class AlbumDetail extends React.Component {
  render() {
    return(
      <AlbumContainer>
        <div className="pt-callout pt-intent-primary">
          <h4>{this.props.album.field_artist}</h4>
          <h2>{this.props.album.field_album}</h2>
          <img
            src={this.props.album.field_cover_image_large}
            alt={this.props.album.title}
          />
          <p className="pt-ui-text-large"><a href={'https://open.spotify.com/album/' + this.props.album.field_spotify_album_id} target="_blank">Play on Spotify</a></p>
          <Ranking
            list="rtrade"
            rank={this.props.album.rtrade}
          />
        </div>
      </AlbumContainer>
    )
  }
}

AlbumDetail.propTypes = {
  album: PropTypes.object.isRequired
};

export default AlbumDetail;