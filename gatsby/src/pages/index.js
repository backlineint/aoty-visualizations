import React, { useState, useReducer } from "react"
import { graphql} from "gatsby"

import { AppProvider } from '../components/AppContext'
import ControlPanel from "../components/ControlPanel"
import Visualizations from "../components/Visualizations"

// Styling
import '@blueprintjs/core/dist/blueprint.css';

// Pick up - add filter texbox and create example of filtering albums
// Make Album functional component

const initialRowControl = {
  5: {
    rows: 5,
    active: false,
    disabled: false
  },
  10: {
    rows: 10,
    active: false,
    disabled: false
  },
  25: {
    rows: 25,
    active: false,
    disabled: false
  },
  50: {
    rows: 50,
    active: true,
    disabled: false
  }
};

function rowReducer(state, action) {
  switch (action.type) {
    case 'change':
      const rowControl = {...state}
      Object.keys(rowControl).map(key => {
        if (parseInt(key, 10) === action.newRows) {
          rowControl[key].active = true;
        }
        else {
          rowControl[key].active = false;
        }
        return rowControl;
      })
      return rowControl
    default:
      return state
  }
}

export default ({ data }) => {
  // TODO - iterate on state management. Should this even live here?
  // does having multiple values passed to the provider impact performance
  // Also, may want to create app component so this can more easily be used on 2018 and 2017 pages.
  const [allAlbums] = useState(data)
  const [rowControl, dispatchRow] = useReducer(rowReducer, initialRowControl)
  const [rows, setRows] = useState(50)
  // Note - you can have multiple providers, so you can wrap different sections of the app 
  // and pass different values.
  // TODO - shift level of providers
  return(
    <AppProvider value={{
      allAlbums, 
      rows, 
      rowControl, 
      dispatchRow,
      setRows
      }}>
      <div className="App">
        <ControlPanel 
          header="Best of Best of 2018" 
        />
        <Visualizations />
      </div>
    </AppProvider>
  )

}

export const query = graphql`
  query {
    allNodeAlbum(filter: {field_year: {eq: 2018}}) {
      nodes {
        field_artist
        field_album
        field_spotify_album_id
        field_cover_image
        field_cover_image_large
      }
    }
  }
`