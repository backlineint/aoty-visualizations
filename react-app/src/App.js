import React, { Component } from 'react';
import AlbumTable from './components/AlbumTable';

import albums from './albums';

class App extends Component {
  state = {
    albums
  };

  render() {
    return (
      <div className="App">
        <h2>Best of Best Of 2016</h2>
        <AlbumTable albums={this.state.albums} />
      </div>
    );
  }
}

export default App;
