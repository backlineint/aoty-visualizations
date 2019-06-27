import React, {useContext} from 'react';
import styled from 'styled-components';
import { Cell, Column, Table } from "@blueprintjs/table";

import AppContext from "./AppContext"

import '@blueprintjs/table/dist/table.css';

const StyledAlbumTable = styled.div`
  height: 89vh;
`;

// Todo - render cell variables are throwing an error - see if there is any way to work around that

export default () => {
  const data = useContext(AppContext)
  const albums = data.appState.filteredAlbums
  const rows = data.appState.rows

  // Feels like this could be streamlined, but maybe it is a limitation of blueprint...
  const renderArtistCell = (rowIndex: number) => {
    return <Cell>{albums[rowIndex].field_artist}</Cell>
  };
  const renderAlbumCell = (rowIndex: number) => {
    return <Cell>{albums[rowIndex].field_album}</Cell>
  };
  const renderGenreCell = (rowIndex: number) => {
    return <Cell>{decodeURI(albums[rowIndex].field_genre)}</Cell>
  };
  const renderAvgCell = (rowIndex: number) => {
    return <Cell>{albums[rowIndex].field_avg}</Cell>
  };
  const renderConsScoreCell = (rowIndex: number) => {
    return <Cell>{albums[rowIndex].field_cons_score}</Cell>
  };
  const renderIdCell = (rowIndex: number) => {
    return <Cell>{albums[rowIndex].field_id}</Cell>
  };
  const renderListsCell = (rowIndex: number) => {
    return <Cell>{albums[rowIndex].field_lists}</Cell>
  };
  const renderTopTenCell = (rowIndex: number) => {
    return <Cell>{albums[rowIndex].field_top_10s}</Cell>
  };
  const renderWtAvgCell = (rowIndex: number) => {
    return <Cell>{albums[rowIndex].field_wt_avg}</Cell>
  };

  return (
    <StyledAlbumTable className="album-table">
      <Table numRows={rows}>
        <Column name="Artist" renderCell={renderArtistCell}/>
        <Column name="Album" renderCell={renderAlbumCell}/>
        <Column name="Genre" renderCell={renderGenreCell}/>
        <Column name="Average" renderCell={renderAvgCell}/>
        <Column name="Consensus Score" renderCell={renderConsScoreCell}/>
        <Column name="ID" renderCell={renderIdCell}/>
        <Column name="Lists" renderCell={renderListsCell}/>
        <Column name="Top Ten" renderCell={renderTopTenCell}/>
        <Column name="Weighted Average" renderCell={renderWtAvgCell}/>
      </Table>
    </StyledAlbumTable>
  )

}

// TODO - Prop Types
