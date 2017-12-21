import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
          <p>
            <h4>{this.props.album.field_artist}</h4>
            <h2>{this.props.album.field_album}</h2>
          </p>
          <img
            src={this.props.album.field_cover_image_large}
            alt={this.props.album.title}
          />
          <p className="pt-ui-text-large"><a href={'https://open.spotify.com/album/' + this.props.album.field_spotify_album_id} target="_blank">Play on Spotify</a></p>
          <p>
            Rough Trade: {this.props.album.rtrade}<br />
            Q: {this.props.album.q}<br />
            Rolling Stone: {this.props.album.rstone}<br />
            Paste: {this.props.album.paste}<br />
            NME: {this.props.album.nme}<br />
            Mojo: {this.props.album.mojo}<br />
            Drowned in Sound: {this.props.album.drwnd}<br />
            Consequence of Sound: {this.props.album.cos}<br />
            Uncut: {this.props.album.uncut}
          </p>
        </div>
      </AlbumContainer>
    )
  }
}

AlbumDetail.propTypes = {
  album: PropTypes.object.isRequired
};

export default AlbumDetail;