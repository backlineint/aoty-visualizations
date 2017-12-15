import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import CoverView from './CoverView';
import AlbumTable from './AlbumTable';

import { Tab2, Tabs2 } from "@blueprintjs/core";

const VisualizationTabs = styled(Tabs2)`
	margin-left: 75px;
  padding: .5rem 1rem 1rem 1rem;
  height: 100vh;
  // Todo - Adjust so overflow is scroll when on table view.
  overflow: hidden;
  transition: all 0.2s ease-out;
  
  ${props => props.controlPanelExpanded && css`
    margin-left: 25%;
    transition: all 0.2s ease-in;
  `}
`;

class Visualizations extends React.Component {
  render() {
    return(
      <VisualizationTabs id="Tabs" renderActiveTabPanelOnly="true" controlPanelExpanded={this.props.controlPanelExpanded}>
        <Tab2 id="cv" title="Covers" panel={<CoverView albums={this.props.albums} rows={this.props.rows} selectedAlbum={this.props.selectedAlbum} selectAlbum={this.props.selectAlbum} />} />
        <Tab2 id="tv" title="Table" panel={<AlbumTable albums={this.props.albums} rows={this.props.rows} />} />
      </VisualizationTabs>
    )
  }
}

Visualizations.propTypes = {
  albums: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired,
  controlPanelExpanded: PropTypes.bool.isRequired,
  selectedAlbum: PropTypes.number.isRequired,
  selectAlbum: PropTypes.func.isRequired
};

export default Visualizations;
