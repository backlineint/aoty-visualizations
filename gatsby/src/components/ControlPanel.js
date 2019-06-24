import React, {useContext} from "react"

import AppContext from "./AppContext"

import Gear from './Gear'
import RowControl from './RowControl'
import SearchInput from './SearchInput'
import SortControl from './SortControl'

import './ControlPanel.css';

// Does this need to be contol panel state?
const sortControl = {
  options: {
    none: {field: 'none', label: 'None', defaultSort: 'asc'},
    field_artist: {field: 'field_artist', label: 'Artist', defaultSort: 'asc'},
    field_album: {field: 'field_album', label: 'Album', defaultSort: 'asc'},
    field_genre: {field: 'field_genre', label: 'Genre', defaultSort: 'asc'},
    field_avg: {field: 'field_avg', label: 'Average', defaultSort: 'asc'},
    field_cons_score: {field: 'field_cons_score', label: 'Consensus Score', defaultSort: 'asc'},
    field_lists: {field: 'field_lists', label: 'Lists', defaultSort: 'desc'},
    field_top_10s: {field: 'field_top_10s', label: 'Top Ten', defaultSort: 'desc'},
    field_wt_avg: {field: 'field_wt_avg', label: 'Weighted Average', defaultSort: 'asc'}
  }
}

export default (props) => {
  const data = useContext(AppContext)
  const selectedSort = data.appState.selectedSort
  //const dispatchApp = data.dispatchApp
  return(
    <div className="control-panel">
      <Gear />
      <h2>{props.header}</h2>
      <RowControl
        label="Number of Results:"
      />
      <SearchInput
        placeholder="Filter by Album, Artist or Genre"
      />
      <SortControl
        label="Sort by:"
        sortControl={sortControl}
        sortAlbums={() => {/*this.props.sortAlbums*/}}
        value={selectedSort}
        updateSelected={() => {/*this.updateSelectedSort*/}}
        unsetSelected={() => {/*this.updateSelectedList*/}}
      />
    </div>
  )
}

// TODO - Prop Types