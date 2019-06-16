import React from 'react';
import styled from 'styled-components';
// Todo - Handle Rankings
// import Ranking from './Ranking';

const AlbumContainer = styled.div`
  width: 40%;
  height: 91vh;
  float: left;
  padding-left: 1rem;
  padding-bottom: 1rem;
  overflow: scroll;
  overflow-wrap: break-word;
  hyphens: auto;
  .pt-callout {
    max-width: 324px;
    margin-right: 1.25rem;
    border: 1px solid dodgerblue;
  }
  h4 {
    color: dodgerblue;
  }
  img {
    max-width: 100%;
    border: 1px solid white;
  }
`;

export default (props) => {
  let cover = null;
  if (props.album.field_cover_image_large) {
    cover = <img
      src={props.album.field_cover_image_large}
      alt={props.album.title}
    />;
  }
  return(
    <AlbumContainer>
      <div className="pt-callout pt-intent-primary">
        <h4>{props.album.field_artist}</h4>
        <h2>{props.album.field_album}</h2>
        {cover}
        <p className="pt-ui-text-large"><a href={'https://open.spotify.com/album/' + props.album.field_spotify_album_id} target="_blank">Play on Spotify</a></p>
      </div>
    </AlbumContainer>
  )
}

// Todo - Prop types