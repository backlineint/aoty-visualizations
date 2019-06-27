import React from 'react';
import styled from 'styled-components';
// Todo - Handle Rankings
import Ranking from './Ranking';

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
  // TODO - Make year part of app state
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
        <p>{props.album.field_genre_display}</p>
        {cover}
        <p className="pt-ui-text-large"><a href={'https://open.spotify.com/album/' + props.album.field_spotify_album_id} target="_blank" rel="noopener noreferrer">Play on Spotify</a></p>
        <Ranking list="rtrade" rank={props.album.rtrade_list} />
        <Ranking list="q" rank={props.album.q_list} />
        <Ranking list="rstone" rank={props.album.rstone_list} />
        <Ranking list="paste" rank={props.album.paste_list} />
        <Ranking list="nme" rank={props.album.nme_list} />
        <Ranking list="mojo" rank={props.album.mojo_list} />
        <Ranking list="drwnd" rank={props.album.drwnd_list} />
        <Ranking list="cos" rank={props.album.cos_list} />
        <Ranking list="uncut" rank={props.album.uncut_list} />
        <Ranking list="skinny" rank={props.album.skinny_list} />
        <Ranking list="cmplx" rank={props.album.cmplx_list} />
        <Ranking list="crack" rank={props.album.crack_list} />
        <Ranking list="gvsb" rank={props.album.gvsb_list} />
        <Ranking list="noisey" rank={props.album.noisey_list} />
        <Ranking list="quietus" rank={props.album.quietus_list} />
        <Ranking list="strgum" rank={props.album.strgum_list} />
        <Ranking list="uproxx" rank={props.album.uproxx_list} />
        <Ranking list="vnlfct" rank={props.album.vnlfct_list} />
        <Ranking list="wire" rank={props.album.wire_list} />
        <Ranking list="popmat" rank={props.album.popmat_list} />
        <Ranking list="pfork" rank={props.album.pfork_list} />
        <Ranking list="npr" rank={props.album.npr_list} />
        <Ranking list="spin" rank={props.album.spin_list} />
        <Ranking list="line" rank={props.album.line_list} />
        <Ranking list="tmt" rank={props.album.tmt_list} />
        <Ranking list="altern" rank={props.album.altern_list} />
        <Ranking list="fact" rank={props.album.fact_list} />
      </div>
    </AlbumContainer>
  )
}

// Todo - Prop types