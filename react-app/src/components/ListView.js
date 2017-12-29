import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';

const HeatMapWrapper = styled.div`
  height: 98vh;
  width: 95vw;

  ${props => props.controlPanelExpanded && css`
    width: 75vw;
  `}
`;

class ListView extends React.Component {
  constructor(props) {
    super(props);

    const defaultData = this.props.albums.slice(0, this.props.rows);

    const heatmapData = [];

    defaultData.forEach(function(album){
      const processedAlbum = {...album};
      if (processedAlbum.attributes.rtrade === 101) { processedAlbum.attributes.rtrade = ''; }
      if (processedAlbum.attributes.q === 101) { processedAlbum.attributes.q = ''; }
      if (processedAlbum.attributes.rstone === 101) { processedAlbum.attributes.rstone = ''; }
      if (processedAlbum.attributes.paste === 101) { processedAlbum.attributes.paste = ''; }
      if (processedAlbum.attributes.nme === 101) { processedAlbum.attributes.nme = ''; }
      if (processedAlbum.attributes.mojo === 101) { processedAlbum.attributes.mojo = ''; }
      if (processedAlbum.attributes.drwnd === 101) { processedAlbum.attributes.drwnd = ''; }
      if (processedAlbum.attributes.cos === 101) { processedAlbum.attributes.cos = ''; }
      if (processedAlbum.attributes.uncut === 101) { processedAlbum.attributes.uncut = ''; }
      if (processedAlbum.attributes.skinny === 101) { processedAlbum.attributes.skinny = ''; }
      if (processedAlbum.attributes.cmplx === 101) { processedAlbum.attributes.cmplx = ''; }
      if (processedAlbum.attributes.crack === 101) { processedAlbum.attributes.crack = ''; }
      if (processedAlbum.attributes.gvsb === 101) { processedAlbum.attributes.gvsb = ''; }
      if (processedAlbum.attributes.noisey === 101) { processedAlbum.attributes.noisey = ''; }
      if (processedAlbum.attributes.quietus === 101) { processedAlbum.attributes.quietus = ''; }
      if (processedAlbum.attributes.strgum === 101) { processedAlbum.attributes.strgum = ''; }
      if (processedAlbum.attributes.uproxx === 101) { processedAlbum.attributes.uproxx = ''; }
      if (processedAlbum.attributes.vnlfct === 101) { processedAlbum.attributes.vnlfct = ''; }
      if (processedAlbum.attributes.wire === 101) { processedAlbum.attributes.wire = ''; }
      if (processedAlbum.attributes.popmat === 101) { processedAlbum.attributes.popmat = ''; }
      if (processedAlbum.attributes.pfork === 101) { processedAlbum.attributes.pfork = ''; }
      if (processedAlbum.attributes.npr === 101) { processedAlbum.attributes.npr= ''; }
      if (processedAlbum.attributes.spin === 101) { processedAlbum.attributes.spin = ''; }
      if (processedAlbum.attributes.line === 101) { processedAlbum.attributes.line = ''; }
      heatmapData.push(processedAlbum.attributes);
    });

    this.state = {
      heatmapData
    };
  }

  componentWillReceiveProps(nextProps) {
    const defaultData = nextProps.albums.slice(0, nextProps.rows);

    const heatmapData = [];

    defaultData.forEach(function(album){
      const processedAlbum = {...album};
      if (processedAlbum.attributes.rtrade === 101) { processedAlbum.attributes.rtrade = ''; }
      if (processedAlbum.attributes.q === 101) { processedAlbum.attributes.q = ''; }
      if (processedAlbum.attributes.rstone === 101) { processedAlbum.attributes.rstone = ''; }
      if (processedAlbum.attributes.paste === 101) { processedAlbum.attributes.paste = ''; }
      if (processedAlbum.attributes.nme === 101) { processedAlbum.attributes.nme = ''; }
      if (processedAlbum.attributes.mojo === 101) { processedAlbum.attributes.mojo = ''; }
      if (processedAlbum.attributes.drwnd === 101) { processedAlbum.attributes.drwnd = ''; }
      if (processedAlbum.attributes.cos === 101) { processedAlbum.attributes.cos = ''; }
      if (processedAlbum.attributes.uncut === 101) { processedAlbum.attributes.uncut = ''; }
      if (processedAlbum.attributes.skinny === 101) { processedAlbum.attributes.skinny = ''; }
      if (processedAlbum.attributes.cmplx === 101) { processedAlbum.attributes.cmplx = ''; }
      if (processedAlbum.attributes.crack === 101) { processedAlbum.attributes.crack = ''; }
      if (processedAlbum.attributes.gvsb === 101) { processedAlbum.attributes.gvsb = ''; }
      if (processedAlbum.attributes.noisey === 101) { processedAlbum.attributes.noisey = ''; }
      if (processedAlbum.attributes.quietus === 101) { processedAlbum.attributes.quietus = ''; }
      if (processedAlbum.attributes.strgum === 101) { processedAlbum.attributes.strgum = ''; }
      if (processedAlbum.attributes.uproxx === 101) { processedAlbum.attributes.uproxx = ''; }
      if (processedAlbum.attributes.vnlfct === 101) { processedAlbum.attributes.vnlfct = ''; }
      if (processedAlbum.attributes.wire === 101) { processedAlbum.attributes.wire = ''; }
      if (processedAlbum.attributes.popmat === 101) { processedAlbum.attributes.popmat = ''; }
      if (processedAlbum.attributes.pfork === 101) { processedAlbum.attributes.pfork = ''; }
      if (processedAlbum.attributes.npr === 101) { processedAlbum.attributes.npr= ''; }
      if (processedAlbum.attributes.spin === 101) { processedAlbum.attributes.spin = ''; }
      if (processedAlbum.attributes.line === 101) { processedAlbum.attributes.line = ''; }
      heatmapData.push(processedAlbum.attributes);
    });

    this.setState({
      heatmapData
    });
  }

  render() {
    return(
      <HeatMapWrapper controlPanelExpanded={this.props.controlPanelExpanded}>
        <ResponsiveHeatMapCanvas
          data={this.state.heatmapData}
          keys={[
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
            "line"
          ]}
          indexBy="title"
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
            "legend": "country",
            "legendPosition": "center",
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
}

ListView.propTypes = {
  albums: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired,
  controlPanelExpanded: PropTypes.bool
};

export default ListView;