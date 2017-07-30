import React, { Component } from 'react';
import ControlPanel from './components/ControlPanel';
import AlbumTable from './components/AlbumTable';

import './App.css';
import '@blueprintjs/core/dist/blueprint.css';

import albums from './albums';

class App extends Component {
  state = {
    albums,
    rows: 25
  };

  setRows = (newRows) => {
    // Does this copy the value rather than reference the variable?
    const rows = newRows;
    this.setState({rows});
  };

  render() {
    return (
      <div className="App">
        <ControlPanel setRows={this.setRows} />
        <AlbumTable albums={this.state.albums} rows={this.state.rows} />
      </div>
    );
  }
}

export default App;
