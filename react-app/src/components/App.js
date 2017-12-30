import React, { Component } from 'react';
import styled from 'styled-components';
// Starting lite with specific lodash function imports.  If I wanted entire library:
// import * as _ from 'lodash';
import _filter from 'lodash/filter';
import _orderBy from 'lodash/orderBy';
import { Spinner } from '@blueprintjs/core';

import {getAllAlbumData} from '../utilities/utilities';

// Custom components
import ControlPanel from './ControlPanel';
import Visualizations from './Visualizations';

// Styling
import '@blueprintjs/core/dist/blueprint.css';

// TODO - Replace with an udpated copy of JSON API data to allow for offline development.
//import albums from '../data/albums';

const PositionedSpinner = styled.div`
 position: absolute;
 top: 40vh;
 left: 45vw;
`;

class App extends Component {
  constructor() {
    super();

    const defaultSort = 'field_cons_score';
    const defaultSortOrder = 'asc';

    // TODO - Deprecate this and use the rowControl object?
    const rowOptions = [5, 10, 25, 50]; // Row options must be sorted asc
    // TODO - Can we refactor to make better use of rowControl object?
    const defaultRows = 50;

    const controlPanelExpanded = false;

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

    // Todo - convert this to int.
    const selectedAlbum = '0';

    this.state = {
      rowOptions,
      rows: defaultRows,
      defaultSort,
      defaultSortOrder,
      rowControl,
      controlPanelExpanded,
      selectedAlbum
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
        value.attributes.title_display = value.attributes.title;
        value.attributes.title = value.attributes.title.toLowerCase();
        value.attributes.field_avg = parseFloat(value.attributes.field_avg);
        value.attributes.field_cons_score = parseFloat(value.attributes.field_cons_score);
        value.attributes.field_id = parseInt(value.attributes.field_id, 10);
        value.attributes.field_lists = parseInt(value.attributes.field_lists, 10);
        value.attributes.field_top_10s = parseInt(value.attributes.field_top_10s, 10);
        value.attributes.field_wt_avg = parseFloat(value.attributes.field_wt_avg);
        // Protect from empty genre fields
        if (!value.attributes.field_genre) {
          value.attributes.field_genre = 'n/a';
        }
        // flatten list ranking values
        value.attributes.field_list_rankings.forEach(function(list) {
          const listRank = list.split(':');
          // TODO - find a way to handle 0 values rather than this 101/'' hack.
          value.attributes[listRank[0] + '_list'] = isNaN(parseInt(listRank[1], 10)) ? 101 : parseInt(listRank[1], 10);
          value.attributes[listRank[0]] = isNaN(parseInt(listRank[1], 10)) ? '' : parseInt(listRank[1], 10);
        });
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
      return album.attributes.title.includes(filter.toLowerCase()) || album.attributes.field_genre.includes(filter.toLowerCase());
    });

    // Change the rows accordingly
    if (filteredAlbums.length > 50) {
      this.handleRowChange(50);
    }
    else {
      this.handleRowChange(filteredAlbums.length);
    }

    this.setState({
      activeAlbums: filteredAlbums,
      selectedAlbum: '0'
    });
  };

  sortAlbums = (column, order) => {
    // Wonky fix below, but adding attributes to the select value was causing problems.
    const sortedAlbums = _orderBy(this.state.activeAlbums, 'attributes.' + column, order);
    this.setState({
      activeAlbums: sortedAlbums,
      selectedAlbum: '0'
    });
  };

  expandControlPanel = () => {
    this.setState({
      controlPanelExpanded: true
    });
  };

  collapseControlPanel = () => {
    this.setState({
      controlPanelExpanded: false
    });
  };

  selectAlbum = (key) => {
    this.setState({
      selectedAlbum: key
    });
  };

  render() {
    // If the API hasn't returned albums yet, indicate that we're loading.
    if (this.state.albums) {
      return (
        <div className="App">
          <ControlPanel
            header="Best of Best of 2017"
            filterAlbums={this.filterAlbums}
            sortAlbums={this.sortAlbums}
            rowControl={this.state.rowControl}
            handleRowChange={this.handleRowChange}
            setRows={this.setRows}
            expandControlPanel={this.expandControlPanel}
            collapseControlPanel={this.collapseControlPanel}
          />
          <Visualizations
            albums={this.state.activeAlbums}
            rows={this.state.rows}
            controlPanelExpanded={this.state.controlPanelExpanded}
            selectedAlbum={this.state.selectedAlbum}
            selectAlbum={this.selectAlbum}
          />
        </div>
      );
    }
    else {
      return (
        <PositionedSpinner>
          <Spinner
            className="pt-large"
          />
        </PositionedSpinner>
      );
    }
  }
}

export default App;
