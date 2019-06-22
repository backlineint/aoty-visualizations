import React, {useContext} from 'react';
import styled from 'styled-components';

import AppContext from "./AppContext"

const SearchInputWrapper = styled.div`
 margin-bottom: 1rem;
`;

export default (props) => {
  const data = useContext(AppContext)
  const dispatchApp = data.dispatchApp
  return(
    <SearchInputWrapper className="pt-input-group pt-large pt-minimal">
      <span className="pt-icon pt-icon-search"></span>
      <input
        className="pt-input"
        type="search"
        placeholder={props.placeholder}
        dir="auto"
        onChange={(e) => {dispatchApp({type: 'filter', filter: e.target.value})}}
      />
    </SearchInputWrapper>
  )
}

// TODO - Prop types
