import React from 'react';
import PropTypes from 'prop-types';
import Gear from './Gear';
import RowControl from './RowControl';
import SearchInput from './SearchInput';
import SortControl from './SortControl';

import './ControlPanel.css';

class ControlPanel extends React.Component {
  constructor() {
    super();

    const sortControl = {
      options: {
        title: {field: 'title', label: 'Album', defaultSort: 'asc'},
        field_genre: {field: 'field_genre', label: 'Genre', defaultSort: 'asc'},
        field_avg: {field: 'field_avg', label: 'Average', defaultSort: 'asc'},
        field_cons_score: {field: 'field_cons_score', label: 'Consensus Score', defaultSort: 'asc'},
        field_id: {field: 'field_id', label: 'ID', defaultSort: 'asc'},
        field_lists: {field: 'field_lists', label: 'Lists', defaultSort: 'desc'},
        field_top_10s: {field: 'field_top_10s', label: 'Top Ten', defaultSort: 'desc'},
        field_wt_avg: {field: 'field_wt_avg', label: 'Weighted Average', defaultSort: 'asc'}
      }
    };

    const sortControlList = {
      options: {
        field_cons_score: {field: 'field_cons_score', label: 'None', defaultSort: 'asc'},
        rtrade: {field: 'rtrade', label: 'Rough Trade', defaultSort: 'asc'},
        q: {field: 'q', label: 'Q', defaultSort: 'asc'},
        rstone: {field: 'rstone', label: 'Rolling Stone', defaultSort: 'asc'},
        paste: {field: 'paste', label: 'Paste', defaultSort: 'asc'},
        nme: {field: 'nme', label: 'NME', defaultSort: 'asc'},
        mojo: {field: 'mojo', label: 'Mojo', defaultSort: 'asc'},
        drwnd: {field: 'drwnd', label: 'Drowned in Sound', defaultSort: 'asc'},
        cos: {field: 'cos', label: 'Consequence of Sound', defaultSort: 'asc'},
        uncut: {field: 'uncut', label: 'Uncut', defaultSort: 'asc'},
        skinny: {field: 'skinny', label: 'The Skinny', defaultSort: 'asc'},
        cmplx: {field: 'cmplx', label: 'Complex', defaultSort: 'asc'},
        crack: {field: 'crack', label: 'Crack Magazine', defaultSort: 'asc'},
        gvsb: {field: 'gvsb', label: 'Gorilla vs Bear', defaultSort: 'asc'},
        noisey: {field: 'noisey', label: 'Noisey', defaultSort: 'asc'},
        quietus: {field: 'quietus', label: 'The Quietus', defaultSort: 'asc'},
        strgum: {field: 'strgum', label: 'Stereogum', defaultSort: 'asc'},
        uproxx: {field: 'uproxx', label: 'Uproxx', defaultSort: 'asc'},
        vnlfct: {field: 'vnlfct', label: 'The Vinyl Factory', defaultSort: 'asc'},
        wire: {field: 'wire', label: 'Wire', defaultSort: 'asc'},
        popmat: {field: 'popmat', label: 'Pop Matters', defaultSort: 'asc'},
        pfork: {field: 'pfork', label: 'Pitchfork', defaultSort: 'asc'},
        npr: {field: 'npr', label: 'NPR', defaultSort: 'asc'},
        spin: {field: 'spin', label: 'Spin', defaultSort: 'asc'},
        line: {field: 'line', label: 'Line', defaultSort: 'asc'},
        tmt: {field: 'tmt', label: 'Tiny Mix Tapes', defaultSort: 'asc'},
        altern: {field: 'altern', label: 'The Alternative', defaultSort: 'asc'},
        fact: {field: 'fact', label: 'Fact', defaultSort: 'asc'}
      }
    };

    this.state = {
      sortControl,
      sortControlList
    };
  }

  render() {
    return (
      <div className="control-panel"
         onMouseEnter={this.props.expandControlPanel}
         onMouseLeave={this.props.collapseControlPanel}
      >
        <Gear />
        <h2>{this.props.header}</h2>
        <RowControl
          label="Number of Results:"
          rowControl={this.props.rowControl}
          handleRowChange={this.props.handleRowChange}
          setRows={this.props.setRows}
        />
        <SearchInput
          placeholder="Filter by Album or Genre"
          filterAlbums={this.props.filterAlbums}
        />
        <SortControl
          label="Sort by:"
          sortControl={this.state.sortControl}
          defaultValue={this.props.defaultSort}
          sortAlbums={this.props.sortAlbums}
        />
        <SortControl
          label="View List:"
          sortControl={this.state.sortControlList}
          defaultValue={this.props.defaultSort}
          sortAlbums={this.props.sortAlbums}
        />
        <p>Data: <a href="http://robmitchum.github.io/aotysheets.html" target="_blank" rel="noopener noreferrer">Album of the Year List Project</a></p>
      </div>
    )
  }
}

ControlPanel.propTypes = {
  header: PropTypes.string.isRequired,
  rowControl: PropTypes.object.isRequired,
  defaultSort: PropTypes.string.isRequired,
  filterAlbums: PropTypes.func.isRequired,
  sortAlbums: PropTypes.func.isRequired,
  handleRowChange: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  expandControlPanel: PropTypes.func.isRequired,
  collapseControlPanel: PropTypes.func.isRequired
};

export default ControlPanel;
