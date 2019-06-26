import React, { useContext, useState } from 'react';
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

// TODO - Is it necessary to explicitly default export here? Const instead?
// What is the React convention vs. what is the Gatsby convention?

export default () => {
  const data = useContext(AppContext)
  const albums = data.appState.filteredAlbums
  const rows = data.appState.rows
  const year = data.appState.year

  const [selectedAlbum, setSelectedAlbum] = useState('0');

  // Todo - Handle album click interations
  if (albums.length > 0) {
    return (
      <>
        <AlbumList>
          {Object.keys(albums).slice(0, rows).map(key =>
            <Album
              key={key}
              artist={albums[key].field_artist}
              title={albums[key].field_album}
              albumId={albums[key].field_spotify_album_id}
              coverImage={albums[key].field_cover_image}
              activeAlbum={selectedAlbum === key}
              selectedAlbum={key}
              selectAlbum={setSelectedAlbum}
            />
          )}
        </AlbumList>
        <AlbumDetail
          album={albums[selectedAlbum]}
          year={year}
        />
      </>
    )
  }
  else {
    return (
      <>
        Search returned no results. Maybe no one likes your favorite album?
      </>
    )
  }

}

// TODO - Prop Types