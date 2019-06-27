import React, {useContext} from 'react';
import styled, { css } from 'styled-components';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';

import AppContext from "./AppContext"

const HeatMapWrapper = styled.div`
  height: 98vh;
  width: 95vw;

  ${props => props.controlPanelExpanded && css`
    width: 75vw;
  `}
`;

export default () => {
  const data = useContext(AppContext)
  const albums = data.appState.filteredAlbums
  const rows = data.appState.rows
  const year = data.appState.year

  const defaultData = albums.slice(0, rows)

  const heatmapData = [];

  defaultData.forEach(function(album){
    heatmapData.push(album);
  })
  let keys = []
  if (year === 2018) {
    keys = [
      "rtrade",
      "q"
    ]
  }
  else {
    keys = [
      "rtrade",
      "q",
      "rstone",
      "paste",
      "nme",
      "mojo",
      "drwnd",
      "cos",
      "uncut",
      "skinny",
      "cmplx",
      "crack",
      "gvsb",
      "noisey",
      "quietus",
      "strgum",
      "uproxx",
      "vnlfct",
      "wire",
      "popmat",
      "pfork",
      "npr",
      "spin",
      "line",
      "tmt",
      "altern",
      "fact"
    ]
  }
  // TODO - Handle controlPanelExpanded
  // Todo - update keys and have an if statement per year

  return(
    <HeatMapWrapper controlPanelExpanded={false}>
      <ResponsiveHeatMapCanvas
        data={heatmapData}
        keys={keys}
        indexBy="title_display"
        margin={{
          "top": 50,
          "right": 60,
          "bottom": 60,
          "left": 250
        }}
        forceSquare={false}
        axisTop={{
          "orient": "top",  
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": -90,
          "legend": "",
          "legendOffset": 36
        }}
        axisLeft={{
          "orient": "left",
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          "legendPosition": "middle",
          "legendOffset": -40
        }}
        cellOpacity={1}
        cellBorderColor="inherit:darker(0.4)"
        labelTextColor="#000000"
        defs={[
          {
            "id": "lines",
            "type": "patternLines",
            "background": "inherit",
            "color": "rgba(0, 0, 0, 0.1)",
            "rotation": -45,
            "lineWidth": 4,
            "spacing": 7
          }
        ]}
        fill={[
          {
            "id": "lines"
          }
        ]}
        animate={true}
        motionStiffness={80}
        motionDamping={9}
        hoverTarget="rowColumn"
        cellHoverOthersOpacity={0.25}
        colors="blues"
        minValue={1}
        maxValue={50}
      />
    </HeatMapWrapper>
  )

}

// Todo - Prop Types