import React from 'react';
import PropTypes from 'prop-types';

class SearchInput extends React.Component {
  render() {
    return(
      <div className="pt-input-group pt-large pt-minimal">
        <span className="pt-icon pt-icon-search"></span>
        <input
          className="pt-input"
          type="search"
          placeholder="Filter Albums"
          dir="auto"
          onChange={(e) => this.props.filterAlbums(e.target.value)}
        />
      </div>
    )
  }
}

SearchInput.propTypes = {
  filterAlbums: PropTypes.func.isRequired
};

export default SearchInput;