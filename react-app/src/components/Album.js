import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AlbumRow = styled.div`
	margin-top: 1rem;
`;

const Number = styled.li`
	margin-left: .75rem;
`;

class Album extends React.Component {
  render() {
    if (this.props.coverImage) {
      const albumLink = 'https://open.spotify.com/album/' + this.props.albumId;
      return(
        <AlbumRow onClick={() => this.props.selectAlbum(this.props.selectedAlbum)} className="pt-card pt-interactive">
          <Number>
            <a href={albumLink} target="_blank">
            <img
              src={this.props.coverImage}
              alt={this.props.title}
            />
            </a>
            {this.props.title}
          </Number>
        </AlbumRow>
      )
    }
    else {
      return(
        <AlbumRow className="pt-card pt-elevation-1 pt-interactive">
          <Number>
            {this.props.title}
          </Number>
        </AlbumRow>
      )
    }
  }
}

Album.propTypes = {
  title: PropTypes.string.isRequired,
  coverImage: PropTypes.string,
  albumId: PropTypes.string,
  selectAlbum: PropTypes.func.isRequired,
  selectedAlbum: PropTypes.string.isRequired // this really shouldn't be a string...
};

export default Album;
