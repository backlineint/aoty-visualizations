import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AlbumRow = styled.div`
	margin-top: 1rem;
`;

const Number = styled.li`
	margin-left: 1rem;
	line-height: 1.25;
  font-size: 16px;
`;
const AlbumSection = styled.div`
	display: inline-block;
	margin-left: .5rem;
	margin-right: .5rem;
	div {
	  color: dodgerblue;
	}
	h4 {
	  margin-bottom: 5px;
	}
`;

class Album extends React.Component {
  render() {
    if (this.props.coverImage) {
      return(
        <AlbumRow
          onClick={() => this.props.selectAlbum(this.props.selectedAlbum)}
          className="pt-card pt-interactive"
        >
          <Number>
            <AlbumSection>
              <img
                src={this.props.coverImage}
                alt={this.props.title}
              />
            </AlbumSection>
            <AlbumSection>
              <div className="pt-ui-text-large">{this.props.artist}</div>
              <h4>{this.props.title}</h4>
            </AlbumSection>
          </Number>
        </AlbumRow>
      )
    }
    else {
      return(
        <AlbumRow
          onClick={() => this.props.selectAlbum(this.props.selectedAlbum)}
          className="pt-card pt-elevation-1 pt-interactive"
        >
          <Number>
            <AlbumSection>
              <div className="pt-ui-text-large">{this.props.artist}</div>
              <h4>{this.props.title}</h4>
            </AlbumSection>
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
