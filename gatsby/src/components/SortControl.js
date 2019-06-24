import React from 'react';

export default (props) => {
  const sortOptions = Object.keys(props.sortControl.options);

  return(
    <label className="pt-label">
      {props.label}
      <div className="pt-select pt-minimal pt-large">
        <select value={props.value} onChange={props.sortAlbums}>
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
