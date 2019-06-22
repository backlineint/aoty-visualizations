import React from "react"

import Gear from './Gear'
import RowControl from './RowControl'
import SearchInput from './SearchInput'

import './ControlPanel.css';

export default (props) => {
  return(
    <div className="control-panel">
      <Gear />
      <h2>{props.header}</h2>
      <RowControl
        label="Number of Results:"
      />
      <SearchInput
        placeholder="Filter by Album, Artist or Genre"
      />
    </div>
  )
}

// TODO - Prop Types