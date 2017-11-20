import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchInputWrapper = styled.div`
 margin-bottom: 1rem;
`;

class SearchInput extends React.Component {
  render() {
    return(
      <SearchInputWrapper className="pt-input-group pt-large pt-minimal">
        <span className="pt-icon pt-icon-search"></span>
        <input
          className="pt-input"
          type="search"
          placeholder="Filter by Album or Genre"
          dir="auto"
          onChange={(e) => this.props.filterAlbums(e.target.value)}
        />
      </SearchInputWrapper>
    )
  }
}

SearchInput.propTypes = {
  filterAlbums: PropTypes.func.isRequired
};

export default SearchInput;