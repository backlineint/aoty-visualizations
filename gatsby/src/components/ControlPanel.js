import React, {useContext} from "react"
import { Link } from "gatsby"

import AppContext from "./AppContext"

import Gear from './Gear'
import RowControl from './RowControl'
import SearchInput from './SearchInput'
import SortControl from './SortControl'

import './ControlPanel.css';

// TODO - Change both sorts to app state so it is easier to change this per year
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

// TODO - This needs to be updated for 2018
const sortControlList2017 = {
  options: {
    none: {field: 'none', label: 'None', defaultSort: 'asc'},
    rtrade_list: {field: 'rtrade_list', label: 'Rough Trade', defaultSort: 'asc'},
    q_list: {field: 'q_list', label: 'Q', defaultSort: 'asc'},
    rstone_list: {field: 'rstone_list', label: 'Rolling Stone', defaultSort: 'asc'},
    paste_list: {field: 'paste_list', label: 'Paste', defaultSort: 'asc'},
    nme_list: {field: 'nme_list', label: 'NME', defaultSort: 'asc'},
    mojo_list: {field: 'mojo_list', label: 'Mojo', defaultSort: 'asc'},
    drwnd_list: {field: 'drwnd_list', label: 'Drowned in Sound', defaultSort: 'asc'},
    cos_list: {field: 'cos_list', label: 'Consequence of Sound', defaultSort: 'asc'},
    uncut_list: {field: 'uncut_list', label: 'Uncut', defaultSort: 'asc'},
    skinny_list: {field: 'skinny_list', label: 'The Skinny', defaultSort: 'asc'},
    cmplx_list: {field: 'cmplx_list', label: 'Complex', defaultSort: 'asc'},
    crack_list: {field: 'crack_list', label: 'Crack Magazine', defaultSort: 'asc'},
    gvsb_list: {field: 'gvsb_list', label: 'Gorilla vs Bear', defaultSort: 'asc'},
    noisey_list: {field: 'noisey_list', label: 'Noisey', defaultSort: 'asc'},
    quietus_list: {field: 'quietus_list', label: 'The Quietus', defaultSort: 'asc'},
    strgum_list: {field: 'strgum_list', label: 'Stereogum', defaultSort: 'asc'},
    uproxx_list: {field: 'uproxx_list', label: 'Uproxx', defaultSort: 'asc'},
    vnlfct_list: {field: 'vnlfct_list', label: 'The Vinyl Factory', defaultSort: 'asc'},
    wire_list: {field: 'wire_list', label: 'Wire', defaultSort: 'asc'},
    popmat_list: {field: 'popmat_list', label: 'Pop Matters', defaultSort: 'asc'},
    pfork_list: {field: 'pfork_list', label: 'Pitchfork', defaultSort: 'asc'},
    npr_list: {field: 'npr_list', label: 'NPR', defaultSort: 'asc'},
    spin_list: {field: 'spin_list', label: 'Spin', defaultSort: 'asc'},
    line_list: {field: 'line_list', label: 'Line', defaultSort: 'asc'},
    tmt_list: {field: 'tmt_list', label: 'Tiny Mix Tapes', defaultSort: 'asc'},
    altern_list: {field: 'altern_list', label: 'The Alternative', defaultSort: 'asc'},
    fact_list: {field: 'fact_list', label: 'Fact', defaultSort: 'asc'}
  }
}

// TODO - Refactor this list to be generated from the initial dataset
const sortControlList2018 = {
  options: {
    none: {field: 'none', label: 'None', defaultSort: 'asc'},
    rtrade_list: {field: 'rtrade_list', label: 'Rough Trade', defaultSort: 'asc'},
    uncut_list: {field: 'uncut_list', label: 'Uncut', defaultSort: 'asc'},
    mojo_list: {field: 'mojo_list', label: 'Mojo', defaultSort: 'asc'},
    cos_list: {field: 'cos_list', label: 'Consequence of Sound', defaultSort: 'asc'},
    line_list: {field: 'line_list', label: 'Line', defaultSort: 'asc'},
    npr_list: {field: 'npr_list', label: 'NPR', defaultSort: 'asc'},
    quietus_list: {field: 'quietus_list', label: 'The Quietus', defaultSort: 'asc'},
    strgum_list: {field: 'strgum_list', label: 'Stereogum', defaultSort: 'asc'},
    uproxx_list: {field: 'uproxx_list', label: 'Uproxx', defaultSort: 'asc'},
    billbrd_list: {field: 'billbrd_list', label: 'Billboard', defaultSort: 'asc'},
    cmplx_list: {field: 'cmplx_list', label: 'Complex', defaultSort: 'asc'},
    crack_list: {field: 'crack_list', label: 'Crack Magazine', defaultSort: 'asc'},
    mscomh_list: {field: 'mscomh_list', label: 'MusicOMH', defaultSort: 'asc'},
    noisey_list: {field: 'noisey_list', label: 'Noisey', defaultSort: 'asc'},
    pfork_list: {field: 'pfork_list', label: 'Pitchfork', defaultSort: 'asc'},
    popmat_list: {field: 'popmat_list', label: 'Pop Matters', defaultSort: 'asc'},
    wire_list: {field: 'wire_list', label: 'Wire', defaultSort: 'asc'},
    nme_list: {field: 'nme_list', label: 'NME', defaultSort: 'asc'},
    spin_list: {field: 'spin_list', label: 'Spin', defaultSort: 'asc'},
    rstone_list: {field: 'rstone_list', label: 'Rolling Stone', defaultSort: 'asc'},
    '405_list': {field: '405_list', label: '405', defaultSort: 'asc'},
    altern_list: {field: 'altern_list', label: 'The Alternative', defaultSort: 'asc'},
    blare_list: {field: 'blare_list', label: 'Blare', defaultSort: 'asc'},
    earbud_list: {field: 'earbud_list', label: 'Earbud', defaultSort: 'asc'},
    fact_list: {field: 'fact_list', label: 'Fact', defaultSort: 'asc'},
    giitv_list: {field: 'giitv_list', label: 'God is in the TV', defaultSort: 'asc'},
    q_list: {field: 'q_list', label: 'Q', defaultSort: 'asc'},
    tmt_list: {field: 'tmt_list', label: 'Tiny Mix Tapes', defaultSort: 'asc'},
    treble_list: {field: 'treble_list', label: 'Treble', defaultSort: 'asc'},
    vinfac_list: {field: 'vinfac_list', label: 'The Vinyl Factory', defaultSort: 'asc'},
    guard_list: {field: 'guard_list', label: 'The Guardian', defaultSort: 'asc'}
  }
}

export default (props) => {
  const data = useContext(AppContext)
  const selectedSort = data.appState.selectedSort
  const selectedList = data.appState.selectedList
  const dispatchApp = data.dispatchApp
  const year = data.appState.year

  let sortControlList
  if (year === 2017) {
    sortControlList = sortControlList2017
  }
  if (year === 2018) {
    sortControlList = sortControlList2018
  }
  
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
        value={selectedSort}
        sortAlbums={(e) => dispatchApp({type: 'sort', column: e.target.value, order: sortControl.options[e.target.value].defaultSort})}
      />
      <SortControl
        label="View List:"
        sortControl={sortControlList}
        value={selectedList}
        sortAlbums={(e) => dispatchApp({type: 'list', column: e.target.value, order: sortControlList.options[e.target.value].defaultSort})}
      />
      <h4>Jump to: <Link to="/2018">2018</Link> / <Link to="/2017">2017</Link></h4>
      <p>Data: <a href="http://robmitchum.github.io/aotysheets.html" target="_blank" rel="noopener noreferrer">Album of the Year List Project</a></p>
    </div>
  )
}

// TODO - Prop Types