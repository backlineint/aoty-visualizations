import React, { useReducer, useEffect } from "react"
import { graphql} from "gatsby"
import _filter from 'lodash/filter';
import _orderBy from 'lodash/orderBy';

import { AppProvider } from '../components/AppContext'
import ControlPanel from "../components/ControlPanel"
import Visualizations from "../components/Visualizations"

// Styling
// Todo - Add global style for body margins
import '@blueprintjs/core/dist/blueprint.css';

// Pick up - implement two sort controls.
// Make Album functional component

// TODO - Move defaults to seperate file
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

// Todo - Split out reducer into a sepearate file.
function appReducer(state, action) {
  const appState = {...state}
  switch (action.type) {
    case 'filter':
      appState.filteredAlbums = _filter(state.allAlbums, function(album) {
        return album.title.includes(action.filter.toLowerCase()) || album.field_genre.includes(action.filter.toLowerCase());
      })

      // Update row control for button group.
      Object.keys(appState.rowControl).map(key => {
        // Set active if we're displaying the same number of rows as a row control option.
        if (parseInt(key, 10) === appState.filteredAlbums.length) {
          appState.rowControl[key].active = true;
          appState.rowControl[key].disabled = false;
        }
        else {
          appState.rowControl[key].active = false;
          // Disable row control options if we have fewer rows than needed.
          if (parseInt(key, 10) > appState.filteredAlbums.length) {
            appState.rowControl[key].disabled = true;
          }
          else {
            appState.rowControl[key].disabled = false;
          }
        }
        return appState.rowControl;
      })
      // Change the rows accordingly
      if (appState.filteredAlbums.length > 50) {
        appState.rows = 50
      }
      else {
        appState.rows = appState.filteredAlbums.length
      }

      return appState
    // case: 'sort':
    case 'set rows':
      // Update row control display
      Object.keys(appState.rowControl).map(key => {
        if (parseInt(key, 10) === action.newRows) {
          appState.rowControl[key].active = true;
        }
        else {
          appState.rowControl[key].active = false;
        }
        return appState.rowControl;
      })
      // Set the active number of rows
      appState.rows = action.newRows
      return appState
    default:
      return state
  }
}

export default ({ data }) => {
  // Copy source data so we can manipulate it
  const allAlbums = data.allNodeAlbum.nodes
  // TODO - see if we can avoid using let here, seems like this variable would be reset every time
  // for no real reason.
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
    rowControl: initialRowControl,
    rows: 50
  }
  // TODO - Rename to just state and dispatch
  const [appState, dispatchApp] = useReducer(appReducer, initialAppState)

  return(
    <AppProvider value={{
      appState,
      dispatchApp,
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