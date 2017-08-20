import React from 'react';
import PropTypes from 'prop-types';
import Facet from './Facet';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';

class ControlPanel extends React.Component {
  // Pass props to the constructor / super to access them in the constructor.
  // Seems like using props to set state is an antipattern / bad news.  Maybe refactor this eventually.
  constructor(props) {
    super(props);

    // Create row controls
    const rowOptions = this.props.rowOptions;
    const rowControl = {};

    rowOptions.forEach(function(item) {
      if (item === this.props.rows) {
        rowControl[item] = {
          rows: item,
          disabled: false,
          active: true,
          className: "pt-button pt-intent-primary pt-active"
        };
      }
      else {
        rowControl[item] = {
          rows: item,
          disabled: false,
          active: false,
          className: "pt-button pt-intent-primary"
        }
      }
    }, this);

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
    const facetGenre = _uniq(_map(this.props.albums, 'field_genre'));

    this.state = {
      rowControl,
      sortControl,
      facetGenre
    };
  }

  componentWillReceiveProps(nextProps) {
    // Check to see if any of the row controls need to be disabled or re-enabled.
    const rowControl = {...this.state.rowControl};
    const rowControlIds = Object.keys(rowControl);
    for (const key of rowControlIds) {
      // Disable or enable row controls based on filtered albums
      if (rowControl[key].rows > nextProps.albums.length) {
        rowControl[key].disabled = true;
      }
      else if(rowControl[key].disabled === true) {
        rowControl[key].disabled = false;
      }
    }
    this.setState({rowControl});

    // Update the facet lists when the album list is filtered.
    const facetGenre = _uniq(_map(nextProps.albums, 'field_genre'));
    this.setState({facetGenre});
  }

  handleRowChange = (numRows) => {
    this.props.setRows(numRows);
    const rowControl = {...this.state.rowControl};
    // TODO - Move to componentWillReceiveProps since we're making similar changes.
    const rowControlIds = Object.keys(rowControl);
    rowControlIds.map((key) => {
      if (parseInt(key, 10) === numRows) {
        rowControl[key].className = "pt-button pt-intent-primary pt-active";
        return rowControl[key].active = true;
      }
      else {
        rowControl[key].className = "pt-button pt-intent-primary";
        return rowControl[key].active = false;
      }
    });
    /* State seems to be updated here without me explicitly setting it, and I'm
       not sure why. Feature of .map perhaps? */
  };

  handleSortChange = (e) => {
    this.props.sortAlbums(e.target.value, this.state.sortControl.options[e.target.value].defaultSort);
  };

  render() {
    const rowControlIds = Object.keys(this.state.rowControl);
    const sortOptions = Object.keys(this.state.sortControl.options);
    return (
      // Todo - convert clases to BEM style syntax
      // Todo - consider splitting out some controls into their own components
      <div className="control-panel">
        <h2>Best of Best Of 2016</h2>
        <p>Number of Results:</p>
        {/* This is less useful now that filtering works. Serves as a good example
            though so I'll keep in in for the time being */}
        <div className="pt-button-group pt-large pt-fill">
          {/* Could convert this to a render function but I think below is more readable */}
          {rowControlIds.map(key =>
            <button
              key={key}
              className={this.state.rowControl[key].className}
              tabIndex="0"
              type="button"
              disabled={this.state.rowControl[key].disabled}
              onClick={() => this.handleRowChange(this.state.rowControl[key].rows)}
            >
              {key}
            </button>
          )}
        </div>
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
  rowOptions: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired,
  defaultSort: PropTypes.string.isRequired,
  setRows: PropTypes.func.isRequired,
  filterAlbums: PropTypes.func.isRequired,
  sortAlbums: PropTypes.func.isRequired
};

export default ControlPanel;
