import React, { Component } from 'react';
// Starting lite with specific lodash function imports.  If I wanted entire library:
// import * as _ from 'lodash';
import _filter from 'lodash/filter';
import _orderBy from 'lodash/orderBy';

import {getAllAlbumData} from '../utilities/utilities';

// Custom components
import ControlPanel from './ControlPanel';
import AlbumTable from './AlbumTable';

// Styling
import '@blueprintjs/core/dist/blueprint.css';

// TODO - Replace with an udpated copy of JSON API data to allow for offline development.
//import albums from '../data/albums';

class App extends Component {
  constructor() {
    super();

    const defaultSort = 'field_cons_score';
    const defaultSortOrder = 'asc';

    const rowOptions = [5, 10, 25, 50]; // Row options must be sorted asc
    const defaultRows = 50;

    const rowControl = {
      5: {
        rows: 5,
        active: false
      },
      10: {
        rows: 10,
        active: false
      },
      25: {
        rows: 25,
        active: false
      },
      50: {
        rows: 50,
        active: true
      }
    };

    this.state = {
      rowOptions,
      rows: defaultRows,
      defaultSort,
      defaultSortOrder,
      rowControl
    };
  }

  componentWillMount() {
    // Need to add albums to state after the constructor because data is loaded async.
    const albumPromise = getAllAlbumData(`http://aoty-reservoir.dd:8083/jsonapi/node/album`);

    // Once the promise is resolved, manipulate the album data and add to state.
    albumPromise.then(albums => {
      // Cast strings to numbers in our original dataset.
      // TODO - Handle this on the Drupal side, or in our method that gets data from the service.
      albums.map((value, key) => {
        // TODO - Genre fix - encoding and case.
        value.attributes.field_avg = parseFloat(value.attributes.field_avg);
        value.attributes.field_cons_score = parseFloat(value.attributes.field_cons_score);
        value.attributes.field_id = parseInt(value.attributes.field_id, 10);
        value.attributes.field_lists = parseInt(value.attributes.field_lists, 10);
        value.attributes.field_top_10s = parseInt(value.attributes.field_top_10s, 10);
        value.attributes.field_wt_avg = parseFloat(value.attributes.field_wt_avg);
        return value;
      });

      // For now we'll leave our full dataset untouched, and instead sort and filter a copy.
      const activeAlbums = _orderBy([...albums], this.state.defaultSort, this.state.defaultSortOrder);

      this.setState({
        albums,
        activeAlbums
      });

    });
  }

  handleRowChange = (numRows) => {
    const rowControl = {...this.state.rowControl};
    // Set active states of buttons in button group
    Object.keys(rowControl).map(key => {
      if (parseInt(key, 10) === numRows) {
        rowControl[key].active = true;
      }
      else {
        rowControl[key].active = false;
      }
      return rowControl;
    });
    this.setState({
      rowControl,
      rows: numRows
    });
  };

  setRows = (newRows) => {
    // Does this copy the value rather than reference the variable?
    const rows = newRows;
    this.setState({rows});
  };

  filterAlbums = (filter) => {
    // Text search on title or genre
    const filteredAlbums = _filter(this.state.albums, function(album) {
      return album.attributes.title.includes(filter) || album.attributes.field_genre.includes(filter);
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
    // Wonky fix below, but adding attributes to the select value was causing problems.
    const sortedAlbums = _orderBy(this.state.activeAlbums, 'attributes.' + column, order);
    this.setState({activeAlbums: sortedAlbums});
  };

  render() {
    // If the API hasn't returned albums yet, indicate that we're loading.
    if (this.state.albums) {
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
            rowControl={this.state.rowControl}
            handleRowChange={this.handleRowChange}
          />
          <AlbumTable
            albums={this.state.activeAlbums}
            rows={this.state.rows}
          />
        </div>
      );
    }
    else {
      return (<div>Loading...</div>);
    }
  }
}

export default App;
