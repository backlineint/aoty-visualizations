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

    // TODO - Deprecate this and use the rowControl object?
    const rowOptions = [5, 10, 25, 50]; // Row options must be sorted asc
    // TODO - Can we refactor to make better use of rowControl object?
    const defaultRows = 50;

    const rowControl = {
      5: {
        rows: 5,
        active: false,
        disabled: false
      },
      10: {
        rows: 10,
        active: false,
        disabled: false
      },
      25: {
        rows: 25,
        active: false,
        disabled: false
      },
      50: {
        rows: 50,
        active: true,
        disabled: false
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

  /*
   * Updates the number of rows displayed and adjusts row control if necessary.
   */
  handleRowChange = (numRows) => {
    const rowControl = {...this.state.rowControl};

    // Update row control for button group.
    Object.keys(rowControl).map(key => {
      // Set active if we're displaying the same number of rows as a row control option.
      if (parseInt(key, 10) === numRows) {
        rowControl[key].active = true;
        rowControl[key].disabled = false;
      }
      else {
        rowControl[key].active = false;
        // Disable row control options if we have fewer rows than needed.
        if (parseInt(key, 10) > numRows) {
          rowControl[key].disabled = true;
        }
        else {
          rowControl[key].disabled = false;
        }
      }
      return rowControl;
    });

    this.setState({
      rowControl,
      rows: numRows
    });

  };


  /*
   * Explicitly sets the number of displayed rows and updates row control state accordingly
   */
  setRows = (newRows) => {
    const rowControl = {...this.state.rowControl};

    // Update the active state of row control buttons
    Object.keys(rowControl).map(key => {
      if (parseInt(key, 10) === newRows) {
        rowControl[key].active = true;
      }
      else {
        rowControl[key].active = false;
      }
      return rowControl;
    });

    this.setState({
      rowControl,
      rows: newRows
    });
  };

  /*
   * Filters album data and initiates changes to rows.
   */
  filterAlbums = (filter) => {
    // Text search on title or genre
    const filteredAlbums = _filter(this.state.albums, function(album) {
      return album.attributes.title.includes(filter) || album.attributes.field_genre.includes(filter);
    });

    // Change the rows accordingly
    if (filteredAlbums.length > 50) {
      this.handleRowChange(50);
    }
    else {
      this.handleRowChange(filteredAlbums.length);
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
            defaultSort={this.state.defaultSort}
            filterAlbums={this.filterAlbums}
            sortAlbums={this.sortAlbums}
            rowControl={this.state.rowControl}
            handleRowChange={this.handleRowChange}
            setRows={this.setRows}
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
