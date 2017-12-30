import React from 'react';
import PropTypes from 'prop-types';

class SortControl extends React.Component {
  handleSortChange = (e) => {
    this.props.updateSelected(e.target.value);
    this.props.unsetSelected('none');
    this.props.sortAlbums(e.target.value, this.props.sortControl.options[e.target.value].defaultSort);
  };

  render() {
    const sortOptions = Object.keys(this.props.sortControl.options);
    return(
      <label className="pt-label">
        {this.props.label}
        <div className="pt-select pt-minimal pt-large">
          <select value={this.props.value} onChange={this.handleSortChange}>
            {sortOptions.map(key =>
              <option
                key={key}
                value={this.props.sortControl.options[key].field}
              >
                {this.props.sortControl.options[key].label}
              </option>
            )}
          </select>
        </div>
      </label>
    )
  }
}

SortControl.propTypes = {
  label: PropTypes.string,
  sortControl: PropTypes.object.isRequired,
  sortAlbums: PropTypes.func.isRequired
};

export default SortControl;
