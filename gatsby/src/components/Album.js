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

// Todo - Convert album to be functional component

export default (props) => {
    if (props.coverImage) {
      return(
        <AlbumRow
          onClick={() => props.selectAlbum(props.selectedAlbum)}
          className="pt-card pt-interactive"
          activeAlbum={props.activeAlbum}
        >
          <Number>
            <AlbumSection>
              <img
                src={props.coverImage}
                alt={props.title}
              />
            </AlbumSection>
            <AlbumSection>
              <div className="pt-ui-text-large">{props.artist}</div>
              <h4>{props.title}</h4>
            </AlbumSection>
          </Number>
        </AlbumRow>
      )
    }
    else {
      return(
        <AlbumRow
          onClick={() => props.selectAlbum(props.selectedAlbum)}
          className="pt-card pt-elevation-1 pt-interactive"
        >
          <Number>
            <AlbumSection>
              <div className="pt-ui-text-large">{props.artist}</div>
              <h4>{props.title}</h4>
            </AlbumSection>
          </Number>
        </AlbumRow>
      )
    }

}

// Todo - Prop types