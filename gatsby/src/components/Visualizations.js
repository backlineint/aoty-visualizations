import React from "react"
import styled, { css } from 'styled-components';
import { Tab2, Tabs2 } from "@blueprintjs/core";

import CoverView from "./CoverView"
import ListView from "./ListView";

const VisualizationTabs = styled(Tabs2)`
	margin-left: 75px;
  padding: .5rem 1rem 1rem 1rem;
  height: 100vh;
  overflow: hidden;
  transition: all 0.2s ease-out;
  
  ${props => props.controlPanelExpanded && css`
    margin-left: 25%;
    transition: all 0.2s ease-in;
  `}
`;

export default () => {
  // TODO - Incorporate list and table view components

  return(
    <VisualizationTabs id="Tabs" renderActiveTabPanelOnly="true">
      <Tab2 id="cv" title="Covers" panel={<CoverView />} />
      <Tab2 id="lv" title="Lists" panel={<ListView />} />
    </VisualizationTabs>
  )
}

// TODO - Prop Types