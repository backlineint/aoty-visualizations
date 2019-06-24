import React, {useContext} from 'react';

import AppContext from "./AppContext"

export default (props) => {
  const data = useContext(AppContext)
  const dispatchApp = data.dispatchApp

  const sortOptions = Object.keys(props.sortControl.options);

  // TODO - onChange needs to change to a function passed in by props so this can be reused.
  return(
    <label className="pt-label">
      {props.label}
      <div className="pt-select pt-minimal pt-large">
        <select value={props.value} onChange={(e) => dispatchApp({type: 'sort', column: e.target.value, order: props.sortControl.options[e.target.value].defaultSort})}>
          {sortOptions.map(key =>
            <option
              key={key}
              value={props.sortControl.options[key].field}
            >
              {props.sortControl.options[key].label}
            </option>
          )}
        </select>
      </div>
    </label>
  )

}

// TODO - Prop Types
