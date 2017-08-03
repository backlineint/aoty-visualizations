import React, { Component } from 'react';
// Starting lite with specific lodash function imports.  If I wanted entire library:
// import * as _ from 'lodash';
import _filter from 'lodash/filter';

// Custom components
import ControlPanel from './components/ControlPanel';
import AlbumTable from './components/AlbumTable';

// Styling
import './App.css';
import '@blueprintjs/core/dist/blueprint.css';

// Data
import albums from './albums';

class App extends Component {
  constructor() {
    super();

    // For now we'll leave our full dataset untouched, and instead sort and filter a copy.
    const activeAlbums = [...albums];

    const defaultRows = 50;

    this.state = {
      albums,
      activeAlbums,
      rows: defaultRows
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
    // If there are fewer results than table rows, shrink the table.
    if (filteredAlbums.length < this.state.rows) {
      this.setRows(filteredAlbums.length);
    }
    // If there are more results than table rows, expand the table.
    else if ((filteredAlbums.length > this.state.rows) && (filteredAlbums.length <= 50)) {
      this.setRows(filteredAlbums.length);
    }
    // But don't let it go past 50 rows.
    else if ((filteredAlbums.length > this.state.rows) && (filteredAlbums.length >= 50)) {
      this.setRows(50);
    }
    console.log(filteredAlbums);
    this.setState({activeAlbums: filteredAlbums});
  };

  render() {
    return (
      <div className="App">
        <ControlPanel rows={this.state.rows} setRows={this.setRows} filterAlbums={this.filterAlbums} />
        <AlbumTable albums={this.state.activeAlbums} rows={this.state.rows} />
      </div>
    );
  }
}

export default App;
