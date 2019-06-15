import React from 'react';
import styled, { css } from 'styled-components';

const AlbumRow = styled.div`
	margin-top: 1rem;
	:first-child {
	  margin-top: .05rem;
	}
	:last-child {
	  margin-bottom: 1rem;
	}

  ${props => props.activeAlbum && css`
    border: 1px solid dodgerblue;
  `}
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
	img {
	  border: 1px solid dodgerblue;
	}
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
          activeAlbum={this.props.activeAlbum}
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

export default Album;

// Todo - Prop types