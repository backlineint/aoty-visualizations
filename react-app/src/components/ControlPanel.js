import React from 'react';
import PropTypes from 'prop-types';
import Gear from './Gear';
import RowControl from './RowControl';
import SearchInput from './SearchInput';
import SortControl from './SortControl';

import './ControlPanel.css';

class ControlPanel extends React.Component {
  // Pass props to the constructor / super to access them in the constructor.
  // Seems like using props to set state is an antipattern / bad news.  Maybe refactor this eventually.
  constructor() {
    super();

    const sortControl = {
      options: {
        title: {field: 'title', label: 'Album', defaultSort: 'asc'},
        field_genre: {field: 'field_genre', label: 'Genre', defaultSort: 'asc'},
        field_avg: {field: 'field_avg', label: 'Average', defaultSort: 'asc'},
        field_cons_score: {field: 'field_cons_score', label: 'Consensus Score', defaultSort: 'asc'},
        field_id: {field: 'field_id', label: 'ID', defaultSort: 'asc'},
        field_lists: {field: 'field_lists', label: 'Lists', defaultSort: 'desc'},
        field_top_10s: {field: 'field_top_10s', label: 'Top Ten', defaultSort: 'desc'},
        field_wt_avg: {field: 'field_wt_avg', label: 'Weighted Average', defaultSort: 'asc'}
      }
    };

    this.state = {
      sortControl,
    };
  }

  render() {
    return (
      // Todo - split out more controls into their own components
      <div className="control-panel">
        <Gear />
        <h2>Best of Best Of 2016</h2>
        <RowControl
          label="Number of Results:"
          rowControl={this.props.rowControl}
          handleRowChange={this.props.handleRowChange}
          setRows={this.props.setRows}
        />
        <SearchInput
          placeholder="Filter by Album or Genre"
          filterAlbums={this.props.filterAlbums}
        />
        <SortControl
          label="Sort by:"
          sortControl={this.state.sortControl}
          defaultValue={this.props.defaultSort}
          sortAlbums={this.props.sortAlbums}
        />
      </div>
    )
  }
}

ControlPanel.propTypes = {
  albums: PropTypes.array.isRequired,
  rowControl: PropTypes.object.isRequired,
  defaultSort: PropTypes.string.isRequired,
  filterAlbums: PropTypes.func.isRequired,
  sortAlbums: PropTypes.func.isRequired,
  handleRowChange: PropTypes.func.isRequired
};

export default ControlPanel;
