// Dependencies
import React, { useEffect, useReducer, useState } from "react"
import _orderBy from 'lodash/orderBy';

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

export default (data) => {
  // TODO - Bug - Album detail isn't re-rendering when this side effect completes.
  
  // Copy source data so we can manipulate it
  const allAlbums = data.allAlbums.allNodeAlbum.nodes
  // TODO - see if we can avoid using let here, seems like this variable would be reset every time
  // for no real reason.
  // TODO - Change from filteredAlbums to activeAlbums
  let filteredAlbums = data.allAlbums.allNodeAlbum.nodes

  // Use a side effect to prepare album data, only during initial mount
  useEffect(() => {
    allAlbums.map((value, key) => {
      value.title_display = value.title;
      value.title = value.title.toLowerCase();
      // Cast ranking values
      value.field_avg = parseFloat(value.field_avg)
      value.field_cons_score = parseFloat(value.field_cons_score)
      // Why parse the ID here?
      value.field_id = parseInt(value.field_id, 10)
      value.field_lists = parseInt(value.field_lists, 10)
      value.field_top_10s = parseInt(value.field_top_10s, 10)
      value.field_wt_avg = parseFloat(value.field_wt_avg)

      // Protect from empty genre fields and lowercase for search
      if (!value.field_genre) {
        value.field_genre = 'n/a';
      }
      else {
        value.field_genre_display = value.field_genre;
        value.field_genre = value.field_genre.toLowerCase();
      }

      // flatten list ranking values
      value.field_list_rankings.forEach(function(list) {
        const listRank = list.split(':');
        // TODO - find a way to handle 0 values rather than this 101/'' hack.
        value[listRank[0] + '_list'] = isNaN(parseInt(listRank[1], 10)) ? 101 : parseInt(listRank[1], 10);
        value[listRank[0]] = isNaN(parseInt(listRank[1], 10)) ? '' : parseInt(listRank[1], 10);
      })
      return value
    })
    filteredAlbums = _orderBy([...allAlbums], 'field_cons_score', 'asc')
  }, [])

  const initialAppState = {
    allAlbums,
    filteredAlbums,
    rowControl: initialRowControl,
    selectedSort: 'field_cons_score',
    selectedList: 'none',
    rows: 50,
    year: data.year
  }

  // TODO - Rename to just state and dispatch
  const [appState, dispatchApp] = useReducer(appReducer, initialAppState)
  // TODO - This should move into app state
  const [selectedAlbum, setSelectedAlbum] = useState('0');

  return (
    <AppProvider value={{
      appState,
      dispatchApp,
      selectedAlbum,
      setSelectedAlbum
    }}>
      <div className="App">
        <ControlPanel 
          header={`Best of Best of ${data.year}`}
        />
        <Visualizations />
      </div>
    </AppProvider>
  )
}