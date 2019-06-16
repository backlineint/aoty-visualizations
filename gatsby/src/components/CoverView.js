import React, { useContext } from 'react';
import styled from 'styled-components';

import AppContext from "./AppContext"
import Album from './Album';
import AlbumDetail from './AlbumDetail';

// TODO - This should probably be in a seperate file.
export const AlbumList = styled.ol`
 width: 60%;
 float: left;
 overflow: scroll;
 height: 91vh;
 padding-left: 1px;
 padding-right: 1.5rem;
 margin-top: 0;
`;

export default () => {
  const data = useContext(AppContext)
  // Todo - Handle no results case (see pre-Gatsby app)
  // Todo - Handle album click interations
  return (
    <>
      <AlbumList>
        {Object.keys(data.allNodeAlbum.nodes).map(key =>
          <Album
            key={key}
            artist={data.allNodeAlbum.nodes[key].field_artist}
            title={data.allNodeAlbum.nodes[key].field_album}
            albumId={data.allNodeAlbum.nodes[key].field_spotify_album_id}
            coverImage={data.allNodeAlbum.nodes[key].field_cover_image}
          />
        )}
      </AlbumList>
      <AlbumDetail
        album={data.allNodeAlbum.nodes[1]}
      />
    </>
  )
}

// TODO - Prop Types