import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

// TODO - Find a more react-y way to do this.
var axios = require('axios');

// TODO - Add a main function to allow switching between graphs

class ByAlbum extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        // To prevent flash of incomplete chart, may need to get full data here.
        {title: 0, field_cons_score: 0}
      ],
      items_per_page: 10,
      page: 0,
      offset: 0,
    };
  }

  getData(itemsPerPage, adjustpage, adjustoffset) {
    // Alternatively, could just do this in DidMount...
      // TODO - use function params to get new data and re-render graph
      //this.setState({items_per_page: itemsPerPage});
      console.log("Getting data");
       var _this = this;
       this.serverRequest = axios
        .get("http://aoty-visualizations.dd:8083/2016?items_per_page=" + this.state.items_per_page + "&page=" + this.state.page + "&offset=" + this.state.offset)
        .then(function(result) {
          _this.setState({data: result.data});
        });
   }

  componentDidMount() {
    this.getData(10,0,0);
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const chartStyle = {
        width: "75%",
        float: "left",
    };
      const controlStyle = {
          width: "25%",
          float: "left",
      };
      return (
        <div>
          <div style={chartStyle}>
            <VictoryChart>
              <VictoryAxis
                tickLabelComponent={<VictoryLabel angle={45} />}
                style={{
                  tickLabels: {fontSize: 5}
                }}
              />
              <VictoryAxis
                  dependentAxis
                  style={{
                      tickLabels: {fontSize: 5}
                  }}
              />
              <VictoryBar
                data={this.state.data}
                x={"title"}
                y={"field_cons_score"}
                // It is possible to modify data as it is parsed for graph.
                // y={(datum) => 100 - datum.field_cons_score}
              />
            </VictoryChart>
        </div>
        <div style={controlStyle}>
            <p>Controls</p>
            <button onClick={() => this.getData(20,0,0)}>20 results</button>
        </div>
    </div>
    );
  }
}

const app = document.getElementById('app');

/*
* One simple way to handle multiple visualizations would be to add additional classes for the other charts, and then
* use a select list that on change calls the react render statement to change the graph.
*/
//ReactDOM.render(<Chart2 />, app);

ReactDOM.render(<ByAlbum />, app);