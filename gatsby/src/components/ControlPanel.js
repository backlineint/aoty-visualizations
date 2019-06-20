import React from "react"

import Gear from './Gear';
import RowControl from './RowControl';

import './ControlPanel.css';

export default (props) => {
  return(
    <div className="control-panel">
      <Gear />
      <h2>{props.header}</h2>
      <RowControl
        label="Number of Results:"
      />
    </div>
  )
}

// TODO - Prop Types