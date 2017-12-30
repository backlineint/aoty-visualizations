import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Cell, Column, Table } from "@blueprintjs/table";

import '@blueprintjs/table/dist/table.css';

const StyledAlbumTable = styled.div`
  height: 89vh;
`;

class AlbumTable extends React.Component {
  render() {
    const albums = this.props.albums;

    // Feels like this could be streamlined, but maybe it is a limitation of blueprint...
    const renderArtistCell = (rowIndex: number) => {
      return <Cell>{albums[rowIndex].attributes.field_artist}</Cell>
    };
    const renderAlbumCell = (rowIndex: number) => {
      return <Cell>{albums[rowIndex].attributes.field_album}</Cell>
    };
    const renderGenreCell = (rowIndex: number) => {
      return <Cell>{decodeURI(albums[rowIndex].attributes.field_genre)}</Cell>
    };
    const renderAvgCell = (rowIndex: number) => {
      return <Cell>{albums[rowIndex].attributes.field_avg}</Cell>
    };
    const renderConsScoreCell = (rowIndex: number) => {
      return <Cell>{albums[rowIndex].attributes.field_cons_score}</Cell>
    };
    const renderIdCell = (rowIndex: number) => {
      return <Cell>{albums[rowIndex].attributes.field_id}</Cell>
    };
    const renderListsCell = (rowIndex: number) => {
      return <Cell>{albums[rowIndex].attributes.field_lists}</Cell>
    };
    const renderTopTenCell = (rowIndex: number) => {
      return <Cell>{albums[rowIndex].attributes.field_top_10s}</Cell>
    };
    const renderWtAvgCell = (rowIndex: number) => {
      return <Cell>{albums[rowIndex].attributes.field_wt_avg}</Cell>
    };

    return (
      <StyledAlbumTable className="album-table">
        <Table numRows={this.props.rows}>
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
}

AlbumTable.propTypes = {
  albums: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired
};

export default AlbumTable;