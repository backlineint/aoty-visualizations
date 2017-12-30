import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

class AlbumDetail extends React.Component {
  render() {
    let cover = null;
    if (this.props.album.field_cover_image_large) {
      cover = <img
        src={this.props.album.field_cover_image_large}
        alt={this.props.album.title}
      />;
    }
    return(
      <AlbumContainer>
        <div className="pt-callout pt-intent-primary">
          <h4>{this.props.album.field_artist}</h4>
          <h2>{this.props.album.field_album}</h2>
          {cover}
          <p className="pt-ui-text-large"><a href={'https://open.spotify.com/album/' + this.props.album.field_spotify_album_id} target="_blank">Play on Spotify</a></p>
          <Ranking list="rtrade" rank={this.props.album.rtrade} />
          <Ranking list="q" rank={this.props.album.q} />
          <Ranking list="rstone" rank={this.props.album.rstone} />
          <Ranking list="paste" rank={this.props.album.paste} />
          <Ranking list="nme" rank={this.props.album.nme} />
          <Ranking list="mojo" rank={this.props.album.mojo} />
          <Ranking list="drwnd" rank={this.props.album.drwnd} />
          <Ranking list="cos" rank={this.props.album.cos} />
          <Ranking list="uncut" rank={this.props.album.uncut} />
          <Ranking list="skinny" rank={this.props.album.skinny} />
          <Ranking list="cmplx" rank={this.props.album.cmplx} />
          <Ranking list="crack" rank={this.props.album.crack} />
          <Ranking list="gvsb" rank={this.props.album.gvsb} />
          <Ranking list="noisey" rank={this.props.album.noisey} />
          <Ranking list="quietus" rank={this.props.album.quietus} />
          <Ranking list="strgum" rank={this.props.album.strgum} />
          <Ranking list="uproxx" rank={this.props.album.uproxx} />
          <Ranking list="vnlfct" rank={this.props.album.vnlfct} />
          <Ranking list="wire" rank={this.props.album.wire} />
          <Ranking list="popmat" rank={this.props.album.popmat} />
          <Ranking list="pfork" rank={this.props.album.pfork} />
          <Ranking list="npr" rank={this.props.album.npr} />
          <Ranking list="spin" rank={this.props.album.spin} />
          <Ranking list="line" rank={this.props.album.line} />
          <Ranking list="tmt" rank={this.props.album.tmt} />
          <Ranking list="altern" rank={this.props.album.altern} />
          <Ranking list="fact" rank={this.props.album.fact} />
        </div>
      </AlbumContainer>
    )
  }
}

AlbumDetail.propTypes = {
  album: PropTypes.object.isRequired
};

export default AlbumDetail;