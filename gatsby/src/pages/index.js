import React from "react"
import { graphql} from "gatsby"

import { AppProvider } from '../components/AppContext'
import ControlPanel from "../components/ControlPanel"
import Visualizations from "../components/Visualizations"

// Styling
import '@blueprintjs/core/dist/blueprint.css';

// Pick Up - Work control panel, get changing number of rows working. 
// Make Album functional component

export default ({ data }) => {
  // This might need to be converted to a class component so app has 
  // state that can be passed to context
  // Also, may want to create app component so this can more easily be used on 2018 and 2017 pages.
  return(
    <AppProvider value={data}>
      <div className="App">
        <ControlPanel />
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