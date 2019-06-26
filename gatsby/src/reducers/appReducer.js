import _filter from 'lodash/filter';
import _orderBy from 'lodash/orderBy';

export default function appReducer(state, action) {
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
      //console.log(appState.filteredAlbums)
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