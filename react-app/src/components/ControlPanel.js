import React from 'react';
import PropTypes from 'prop-types';

class ControlPanel extends React.Component {
  // Pass props to the constructor / super to access them in the constructor.
  constructor(props) {
    super(props);

    // Create row controls
    const rowOptions = [5, 10, 25, 50];
    const rowControl = {};

    rowOptions.forEach(function(item) {
      if (item === this.props.rows) {
        rowControl[item] = {
          rows: item,
          active: true,
          className: "pt-button pt-intent-primary pt-active"
        };
      }
      else {
        rowControl[item] = {
          rows: item,
          active: false,
          className: "pt-button pt-intent-primary"
        }
      }
    }, this);

    this.state = {
      rowControl
    };
  }

  handleRowChange = (numRows) => {
    // Todo - protect from case where user tries to change to a number of rows greater
    // than available filtered rows.
    this.props.setRows(numRows);
    const rowControl = {...this.state.rowControl};
    // TODO - Is there a better pattern for iterating through an object?
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

  render() {
    const rowControlIds = Object.keys(this.state.rowControl);
    return (
      // Todo - convert clases to BEM style syntax
      <div className="control-panel">
        <h2>Best of Best Of 2016</h2>
        <p>Number of Results:</p>
        {/* This is less useful now that filtering works. Serves as a good example
            though so I'll keep in in for the time being */}
        <div className="pt-button-group pt-large pt-fill">
          {/* Could convert this to a render function but I think below is more readable */}
          {rowControlIds.map(key =>
            <a
              key={key}
              className={this.state.rowControl[key].className}
              tabIndex="0"
              role="button"
              onClick={() => this.handleRowChange(this.state.rowControl[key].rows)}
            >
              {key}
            </a>
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
            {/* TODO - refactor to generate from js object?
                Also set value based on default sort. */}
            <select defaultValue="choose" onChange={(e) => this.props.sortAlbums(e.target.value)}>
              <option value="choose">Choose a value...</option>
              <option value="title">Album</option>
              <option value="field_genre">Genre</option>
              <option value="field_avg">Average</option>
              <option value="field_cons_score">Consensus Score</option>
              <option value="field_id">ID</option>
              <option value="field_lists">Lists</option>
              <option value="field_top_10s">Top Ten</option>
              <option value="field_wt_avg">Weighted Average</option>
            </select>
          </div>
        </label>
      </div>
    )
  }
}

ControlPanel.propTypes = {
  rows: PropTypes.number.isRequired,
  setRows: PropTypes.func.isRequired,
  filterAlbums: PropTypes.func.isRequired
};

export default ControlPanel;
