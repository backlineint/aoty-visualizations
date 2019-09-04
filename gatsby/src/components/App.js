// Dependencies
import React, { useReducer, useState, useEffect } from "react"
import { Helmet } from 'react-helmet'

// State and Context helpers
import { AppProvider } from '../components/AppContext'
import appReducer from '../reducers/appReducer'

// Settings
import initialRowControl from '../configuration/initialRowControl'

// Components
import ControlPanel from "../components/ControlPanel"
import Visualizations from "../components/Visualizations"

// Styling
// Todo - Add global style for body margins
import '@blueprintjs/core/dist/blueprint.css';

export default (props) => {
  // TODO - Change naming from filteredAlbums to activeAlbums
  const initialAppState = {
    allAlbums: props.allAlbums,
    filteredAlbums: props.filteredAlbums,
    rowControl: initialRowControl,
    selectedSort: 'field_cons_score',
    selectedList: 'none',
    rows: 50,
    year: props.year,
    selectedFilter: ''
  }

  // TODO - Rename to just state and dispatch
  const [appState, dispatchApp] = useReducer(appReducer, initialAppState)
  // TODO - This should move into app state
  const [selectedAlbum, setSelectedAlbum] = useState('0');

  // Update state on re-render to honor changes from Gatsby Preview
  // TODO - Should we move appState up to index level to better handle data updates
  // from Gatsby preview?
  // Is there any way we could avoid useEffect here? Updating state based on incoming
  // props seems like an antipattern.
  useEffect(() => dispatchApp({type: 'preview', previewPayload: initialAppState}))

  return (
    <AppProvider value={{
      appState,
      dispatchApp,
      selectedAlbum,
      setSelectedAlbum
    }}>
      <Helmet>
        <script src="https://unpkg.com/dom4@^1.8"></script>
        <link rel="stylesheet" type="text/css" href="//unpkg.com/@blueprintjs/core@1.40.0/dist/blueprint.css"></link>
      </Helmet>
      <div className="App">
        <ControlPanel 
          header={`Best of Best of ${props.year}`}
        />
        <Visualizations />
      </div>
    </AppProvider>
  )
}