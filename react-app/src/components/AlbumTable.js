import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Column, Table } from "@blueprintjs/table";

import './AlbumTable.css';
import '@blueprintjs/table/dist/table.css';

class AlbumTable extends React.Component {
  render() {
    const albums = this.props.albums;

    // Feels like this could be streamlined, but maybe it is a limitation of blueprint...
    const renderTitleCell = (rowIndex: number) => {
      return <Cell>{albums[rowIndex].title}</Cell>
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
      <div className="album-table">
        <Table numRows={this.props.rows}>
          <Column name="Album" renderCell={renderTitleCell}/>
          <Column name="Genre" renderCell={renderGenreCell}/>
          <Column name="Average" renderCell={renderAvgCell}/>
          <Column name="Consensus Score" renderCell={renderConsScoreCell}/>
          <Column name="ID" renderCell={renderIdCell}/>
          <Column name="Lists" renderCell={renderListsCell}/>
          <Column name="Top Ten" renderCell={renderTopTenCell}/>
          <Column name="Weighted Average" renderCell={renderWtAvgCell}/>
        </Table>
      </div>
    )
  }
}

AlbumTable.propTypes = {
  albums: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired
};

export default AlbumTable;