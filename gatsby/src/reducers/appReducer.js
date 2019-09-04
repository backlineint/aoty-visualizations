import _filter from 'lodash/filter';
import _orderBy from 'lodash/orderBy';
import _isEqual from 'lodash/isEqual';

export default function appReducer(state, action) {
  let appState = {...state}
  switch (action.type) {
    case 'filter':
      // Store filter in state so it can be recreated during preview
      appState.selectedFilter = action.filter.toLowerCase()
      // Apply filter
      appState = filterAlbums(appState, appState.selectedFilter)
      // Apply sort
      if (appState.selectedSort !== 'none') {
        appState = sort(appState, appState.selectedSort)
      }
      // Apply list
      if (appState.selectedList !== 'none') {
        appState = sort(appState, appState.selectedList)
      }
      return appState
    case 'sort':
      appState.selectedSort = action.column
      appState.selectedList = 'none'
      return sort(appState, appState.selectedSort)
    case 'list':
      appState.selectedList = action.column
      appState.selectedSort = 'none'
      return sort(appState, appState.selectedList)
    case 'set rows':
      return setRows(appState, action)
    case 'preview':
      // Update state in repsonse to data changes from Gatsby Preview
      if (_isEqual(action.previewPayload.allAlbums, state.allAlbums)) {
        // If the album payload hasn't changed, do nothing so we don't re-render
        // infinitely
        return state
      }
      else {
        // If the album payload has changed, recreate filtered albums with new
        // data while honoring sort and filter settings.
        appState.allAlbums = action.previewPayload.allAlbums
        appState.filteredAlbums = action.previewPayload.filteredAlbums

        // Apply filters if they exist
        if (appState.selectedFilter !== '') {
          appState = filterAlbums(appState, appState.selectedFilter)
        }
        // Apply sort
        if (appState.selectedSort !== 'none') {
          appState = sort(appState, appState.selectedSort)
        }
        // Apply list
        if (appState.selectedList !== 'none') {
          appState = sort(appState, appState.selectedList)
        }
        // Set Rows seems to work without intervention.
        return appState
      }
    default:
      return state
  }
}

const filterAlbums = (appState, filter) => {
  appState.filteredAlbums = _filter(appState.allAlbums, function(album) {
    return album.title.includes(filter) || album.field_genre.includes(filter);
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
}

const sort = (appState, column) => {
  appState.filteredAlbums = _orderBy(appState.filteredAlbums, column, 'asc')
  // TODO - why is this 560 albums and not the correct amount of albums?
  return appState
}

const setRows = (appState, action) => {
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
}