import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

// TODO - Add a main function to allow switching between graphs

class ByAlbum extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        // Todo - push getting of data up into aoty component so that we have it already.
        {title: 0, field_cons_score: 0}
        // Maybe something like this could set data?
      ],
      // If these values are only being used as rest params, we might not need to set them in state.
      items_per_page: 10,
      page: 0,
      offset: 0,
    };
    // Could we use something like this to bind updateData and set data in constructor?
    this.handleChange = this.handleChange.bind(this);
  }

  // Todo - I'd prefer to name this after the specific event.
  handleChange(event) {
    this.setState({value: event.target.value});
    this.updateData(event.target.value, this.state.page, this.state.offset);
  }

  // Could we always use state here and thus not require values to be passed to the function?
  updateData(itemsPerPage, adjustPage, adjustOffset) {
      // TODO - use function params to get new data and re-render graph
       var _this = this;
       this.serverRequest = axios
        // Todo - make rest address configurable
        .get("http://aoty-visualizations.dd:8083/2016?items_per_page=" + itemsPerPage + "&page=" + adjustPage + "&offset=" + adjustOffset)
        .then(function(result) {
          _this.setState({data: result.data});
        });
   }

  componentDidMount() {
    this.updateData(this.state.items_per_page, this.state.page, this.state.offset);
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  // Todo - abstract form into yet another component. Try creating in a standalone file.
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
            <button onClick={() => this.updateData(10,0,0)}>Reset</button>
            <br />
            <label>
                Number of Albums:
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="5">5</option>
                    <option selected value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </label>
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