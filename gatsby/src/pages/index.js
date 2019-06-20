import React, { useState } from "react"
import { graphql} from "gatsby"

import { AppProvider } from '../components/AppContext'
import ControlPanel from "../components/ControlPanel"
import Visualizations from "../components/Visualizations"

// Styling
import '@blueprintjs/core/dist/blueprint.css';

// Pick Up - Work control panel, get changing number of rows working. 
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

export default ({ data }) => {
  // TODO - iterate on state management. Should this even live here?
  // does having multiple values passed to the provider impact performance
  // convert to reducers.
  // Also, may want to create app component so this can more easily be used on 2018 and 2017 pages.
  const [allAlbums] = useState(data)
  const [rowControl] = useState(initialRowControl)
  return(
    <AppProvider value={{allAlbums, rowControl}}>
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