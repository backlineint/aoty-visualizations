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

// Pick up - update album list to reflect 2018 lists
// * Detail panel functionality
// * Other visualizations
// * Squash TODOS
// * Abstract to app component and apply to other years/all
// * Deploy

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
      appState.filteredAlbums = _filter(appState.allAlbums, function(album) {
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
      // TODO - Maintain sort while filtering.
      return appState
    case 'sort':
      appState.filteredAlbums = _orderBy(appState.filteredAlbums, action.column, action.order)
      appState.selectedSort = action.column
      appState.selectedList = 'none'
      // TODO - why is this 560 albums and not the correct amount of albums?
      console.log(appState.filteredAlbums)
     return appState
    case 'list':
      appState.filteredAlbums = _orderBy(appState.filteredAlbums, action.column, action.order)
      appState.selectedList = action.column
      appState.selectedSort = 'none'
      return appState
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
  // TODO - Change from filteredAlbums to activeAlbums
  let filteredAlbums = data.allNodeAlbum.nodes

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
    filteredAlbums = _orderBy([...allAlbums], 'field_cons_score', 'asc').slice(0, 50)
  }, []);

  // Also, may want to create app component so this can more easily be used on 2018 and 2017 pages.
  const initialAppState = {
    allAlbums,
    filteredAlbums,
    rowControl: initialRowControl,
    selectedSort: 'field_cons_score',
    selectedList: 'none',
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
        field_avg
        field_id
        field_top_10s
        field_wt_avg
        field_lists
        field_list_rankings
      }
    }
  }
`