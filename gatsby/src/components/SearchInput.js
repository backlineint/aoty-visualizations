import React, {useContext} from 'react';
import styled from 'styled-components';

import AppContext from "./AppContext"

const SearchInputWrapper = styled.div`
 margin-bottom: 1rem;
`;

export default (props) => {
  const data = useContext(AppContext)
  const dispatchApp = data.dispatchApp
  const setSelectedAlbum = data.setSelectedAlbum

  return(
    <SearchInputWrapper className="pt-input-group pt-large pt-minimal">
      <span className="pt-icon pt-icon-search"></span>
      <input
        className="pt-input"
        type="search"
        placeholder={props.placeholder}
        dir="auto"
        onChange={(e) => {
          // TODO - Set selected album needs to be merged main app reducer
          setSelectedAlbum('0')
          dispatchApp({type: 'filter', filter: e.target.value})
        }}
      />
    </SearchInputWrapper>
  )
}

// TODO - Prop types
