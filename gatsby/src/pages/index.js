import React, { useReducer, useEffect } from "react"
import { graphql} from "gatsby"
import _filter from 'lodash/filter';
import _orderBy from 'lodash/orderBy';

import { AppProvider } from '../components/AppContext'
import ControlPanel from "../components/ControlPanel"
import Visualizations from "../components/Visualizations"

// Styling
import '@blueprintjs/core/dist/blueprint.css';

// Pick up - figure out a way to address handleRowChange when filtering albums
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

// Todo - Split out reducers into sepearate files.
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

function appReducer(state, action) {
  const appState = {...state}
  switch (action.type) {
    case 'filter':
      appState.filteredAlbums = _filter(state.allAlbums, function(album) {
        //return album.field_genre.includes(action.filter.toLowerCase())
        return album.title.includes(action.filter.toLowerCase()) || album.field_genre.includes(action.filter.toLowerCase());
      })
      // Change the rows accordingly
      if (appState.filteredAlbums.length > 50) {
        // TODO - Do something to handle row
        appState.rows = 50
      }
      else {
        appState.rows = appState.filteredAlbums.length
      }
      return appState
    // case: 'sort':
    case 'set rows':
      appState.rows = action.newRows
      return appState
    default:
      return state
  }
}

export default ({ data }) => {
  // Copy source data so we can manipulate it
  const allAlbums = data.allNodeAlbum.nodes
  // TODO - Have use effect use reducer so we don't need to use let here
  let filteredAlbums = data.allNodeAlbum.nodes

  // Use a side effect to prepare album data, only during initial mount
  useEffect(() => {
    allAlbums.map((value, key) => {
      value.title_display = value.title;
      value.title = value.title.toLowerCase();
      // Cast ranking values
      value.field_cons_score = parseFloat(value.field_cons_score)
      // Protect from empty genre fields and lowercase for search
      if (!value.field_genre) {
        value.field_genre = 'n/a';
      }
      else {
        value.field_genre_display = value.field_genre;
        value.field_genre = value.field_genre.toLowerCase();
      }

      // Flatten individual list ranking values
      return value
    })
    filteredAlbums = _orderBy([...allAlbums], 'field_cons_score', 'asc').slice(0, 50)
  }, []);

  // Also, may want to create app component so this can more easily be used on 2018 and 2017 pages.
  const initialAppState = {
    allAlbums,
    filteredAlbums,
    rows: 50
  }
  const [appState, dispatchApp] = useReducer(appReducer, initialAppState)
  // Todo - move rowcontrol state down to level of conrol panel
  const [rowControl, dispatchRow] = useReducer(rowReducer, initialRowControl)
  // Note - you can have multiple providers, so you can wrap different sections of the app 
  // and pass different values.
  // TODO - shift level of providers
  return(
    <AppProvider value={{
      appState,
      rowControl,
      dispatchApp,
      dispatchRow,
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
        title
        field_genre
        field_cons_score
      }
    }
  }
`