import React, { Component } from 'react';
import ControlPanel from './components/ControlPanel';
import AlbumTable from './components/AlbumTable';

import './App.css';
import '@blueprintjs/core/dist/blueprint.css';

import albums from './albums';

class App extends Component {
  constructor() {
    super();

    const defaultRows = 25;

    this.state = {
      albums,
      rows: defaultRows
    };
  }

  setRows = (newRows) => {
    // Does this copy the value rather than reference the variable?
    const rows = newRows;
    this.setState({rows});
  };

  render() {
    return (
      <div className="App">
        <ControlPanel rows={this.state.rows} setRows={this.setRows} />
        <AlbumTable albums={this.state.albums} rows={this.state.rows} />
      </div>
    );
  }
}

export default App;
