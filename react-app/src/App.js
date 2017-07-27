import React, { Component } from 'react';
import AlbumTable from './components/AlbumTable';

import albums from './albums';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    albums
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Best of Best Of 2016</h2>
        </div>
        {/*albumIds.map((key) => {
          return <p>{albums[key].title}</p>
        })*/}
        <AlbumTable albums={this.state.albums} />
      </div>
    );
  }
}

export default App;
