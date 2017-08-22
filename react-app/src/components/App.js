import React, { Component } from 'react';
// Starting lite with specific lodash function imports.  If I wanted entire library:
// import * as _ from 'lodash';
import _filter from 'lodash/filter';
import _orderBy from 'lodash/orderBy';

// Custom components
import ControlPanel from './ControlPanel';
import AlbumTable from './AlbumTable';

// Styling
import './App.css';
import '@blueprintjs/core/dist/blueprint.css';

// Data
import albums from '../data/albums';

class App extends Component {
  constructor() {
    super();

    // Cast strings to numbers in our original dataset.
    // TODO - Handle this on the Drupal side, or in our method that gets data from the service.
    albums.map((value, key) => {
      // TODO - Genre fix - encoding and case.
      value.field_avg = parseFloat(value.field_avg);
      value.field_cons_score = parseFloat(value.field_cons_score);
      value.field_id = parseInt(value.field_id, 10);
      value.field_lists = parseInt(value.field_lists, 10);
      value.field_top_10s = parseInt(value.field_top_10s, 10);
      value.field_wt_avg = parseFloat(value.field_wt_avg);
      return value;
    });

    const defaultSort = 'field_cons_score';
    const defaultSortOrder = 'asc';

    // For now we'll leave our full dataset untouched, and instead sort and filter a copy.
    const activeAlbums = _orderBy([...albums], defaultSort, defaultSortOrder);

    const rowOptions = [5, 10, 25, 50]; // Row options must be sorted asc
    const defaultRows = 50;

    this.state = {
      albums,
      activeAlbums,
      rowOptions,
      rows: defaultRows,
      defaultSort
    };
  }

  setRows = (newRows) => {
    // Does this copy the value rather than reference the variable?
    const rows = newRows;
    this.setState({rows});
  };

  filterAlbums = (filter) => {
    // Text search on title or genre
    const filteredAlbums = _filter(this.state.albums, function(album) {
      return album.title.includes(filter) || album.field_genre.includes(filter);
    });

    // Todo - is there a race condition here where rows aren't set it user types too fast?
    // If there are fewer results than table rows, shrink the table.
    if (filteredAlbums.length < this.state.rows) {
      let closestRowOption = 50;
      for (const key of this.state.rowOptions.reverse()) {
        if (filteredAlbums.length >= key) {
          closestRowOption = key;
          break;
        }
        else if (filteredAlbums.length < 5) {
          closestRowOption = filteredAlbums.length;
        }
      }
      this.setRows(closestRowOption);
    }

    // If there are more results than table rows, expand the table.
    else if (filteredAlbums.length > this.state.rows) {
      let closestRowOption = 0;
      for (const key of this.state.rowOptions) {
        if (filteredAlbums.length < 5) {
          closestRowOption = filteredAlbums.length;
          break;
        }
        else if (filteredAlbums.length >= key) {
          closestRowOption = key;
        }
      }
      this.setRows(closestRowOption);
    }
    this.setState({activeAlbums: filteredAlbums});
  };

  sortAlbums = (column, order) => {
    const sortedAlbums = _orderBy(this.state.activeAlbums, column, order);
    this.setState({activeAlbums: sortedAlbums});
  };

  render() {
    return (
      <div className="App">
        <ControlPanel
          albums={this.state.activeAlbums}
          rowOptions={this.state.rowOptions}
          rows={this.state.rows}
          defaultSort={this.state.defaultSort}
          setRows={this.setRows}
          filterAlbums={this.filterAlbums}
          sortAlbums={this.sortAlbums}
        />
        <AlbumTable
          albums={this.state.activeAlbums}
          rows={this.state.rows}
        />
      </div>
    );
  }
}

export default App;
