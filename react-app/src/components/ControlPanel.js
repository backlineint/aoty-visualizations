import React from 'react';
import PropTypes from 'prop-types';
import Gear from './Gear';
import Facet from './Facet';
import RowControl from './RowControl';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';

import './ControlPanel.css';

class ControlPanel extends React.Component {
  // Pass props to the constructor / super to access them in the constructor.
  // Seems like using props to set state is an antipattern / bad news.  Maybe refactor this eventually.
  constructor(props) {
    super(props);

    const sortControl = {
      selectedSort: 'field_cons_score',
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

    // Tried using new Set(_map(albums, 'field_genre')) here but it is capping at 100 for some reason.
    const facetGenre = _uniq(_map(this.props.albums, 'attributes.field_genre'));

    this.state = {
      sortControl,
      facetGenre
    };
  }

  componentWillReceiveProps(nextProps) {
    // Update the facet lists when the album list is filtered.
    const facetGenre = _uniq(_map(nextProps.albums, 'attributes.field_genre'));
    this.setState({facetGenre});
  }

  handleSortChange = (e) => {
    this.props.sortAlbums(e.target.value, this.state.sortControl.options[e.target.value].defaultSort);
  };

  render() {
    const sortOptions = Object.keys(this.state.sortControl.options);
    return (
      // Todo - convert clases to BEM style syntax
      // Todo - split out more controls into their own components
      <div className="control-panel">
        <Gear />
        <h2>Best of Best Of 2016</h2>
        <RowControl
          label="Number of Results:"
          rowControl={this.props.rowControl}
          handleRowChange={this.props.handleRowChange}
        />
        <p>Filter Albums:</p>
        <div className="pt-input-group pt-large pt-minimal">
          <span className="pt-icon pt-icon-search"></span>
          <input
            className="pt-input"
            type="search"
            placeholder="Search input"
            dir="auto"
            onChange={(e) => this.props.filterAlbums(e.target.value)}
          />
        </div>
        <label className="pt-label">
          Sort by:
          <div className="pt-select pt-minimal pt-large">
            <select defaultValue={this.props.defaultSort} onChange={this.handleSortChange}>
              {sortOptions.map(key =>
                <option
                  key={key}
                  value={this.state.sortControl.options[key].field}
                >
                  {this.state.sortControl.options[key].label}
                </option>
              )}
            </select>
          </div>
        </label>
        <div>
          <Facet
            name="Genre Filters"
            facets={this.state.facetGenre}
            filterAlbums={this.props.filterAlbums}
          />
        </div>
      </div>
    )
  }
}

ControlPanel.propTypes = {
  albums: PropTypes.array.isRequired,
  rowControl: PropTypes.object.isRequired,
  defaultSort: PropTypes.string.isRequired,
  setRows: PropTypes.func.isRequired,
  filterAlbums: PropTypes.func.isRequired,
  sortAlbums: PropTypes.func.isRequired,
  handleRowChange: PropTypes.func.isRequired
};

export default ControlPanel;
