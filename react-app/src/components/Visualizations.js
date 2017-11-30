import React from 'react';
import PropTypes from 'prop-types';
import AlbumGrid from './AlbumGrid';
import AlbumTable from './AlbumTable';

import { Tab2, Tabs2 } from "@blueprintjs/core";

class Visualizations extends React.Component {
  render() {
    return(
      <Tabs2 id="Tabs" renderActiveTabPanelOnly="true">
        <Tab2 id="av" title="Grid" panel={<AlbumGrid albums={this.props.albums} rows={this.props.rows} />} />
        <Tab2 id="tv" title="Table" panel={<AlbumTable albums={this.props.albums} rows={this.props.rows} />} />
      </Tabs2>
    )
  }
}

Visualizations.propTypes = {
  albums: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired
};

export default Visualizations;
