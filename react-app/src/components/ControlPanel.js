import React from 'react';
import PropTypes from 'prop-types';
import Gear from './Gear';
import RowControl from './RowControl';
import SearchInput from './SearchInput';
import SortControl from './SortControl';

import './ControlPanel.css';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    const selectedYear = this.props.selectedYear;
    const selectedSort = 'field_cons_score';
    const selectedList = 'none';

    const yearControl = {
      options: {
        2018: {year: '2018'},
        2017: {year: '2017'}
      }
    };

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
    };

    const sortControlList = {
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
    };

    this.state = {
      yearControl,
      sortControl,
      sortControlList,
      selectedSort,
      selectedList,
      selectedYear
    };
  }

  updateSelectedYear = (year) => {
    this.setState({
      selectedYear: year
    });
  };

  updateSelectedSort = (sort) => {
    this.setState({
      selectedSort: sort
    });
  };

  updateSelectedList = (list) => {
    this.setState({
      selectedList: list
    });
  };

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
          placeholder="Filter by Album, Artist or Genre"
          filterAlbums={this.props.filterAlbums}
        />
        <SortControl
          label="Sort by:"
          sortControl={this.state.sortControl}
          sortAlbums={this.props.sortAlbums}
          value={this.state.selectedSort}
          updateSelected={this.updateSelectedSort}
          unsetSelected={this.updateSelectedList}
        />
        <SortControl
          label="View List:"
          sortControl={this.state.sortControlList}
          sortAlbums={this.props.sortAlbums}
          value={this.state.selectedList}
          updateSelected={this.updateSelectedList}
          unsetSelected={this.updateSelectedSort}
        />
        <p>Data: <a href="http://robmitchum.github.io/aotysheets.html" target="_blank" rel="noopener noreferrer">Album of the Year List Project</a></p>
      </div>
    )
  }
}

ControlPanel.propTypes = {
  header: PropTypes.string.isRequired,
  rowControl: PropTypes.object.isRequired,
  filterAlbums: PropTypes.func.isRequired,
  sortAlbums: PropTypes.func.isRequired,
  handleRowChange: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  expandControlPanel: PropTypes.func.isRequired,
  collapseControlPanel: PropTypes.func.isRequired
};

export default ControlPanel;
