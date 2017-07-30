import React from 'react';

class ControlPanel extends React.Component {
  render() {
    return (
      <div className="control-panel">
        <h2>Best of Best Of 2016</h2>
        <p>Number of Results:</p>
        <div className="pt-button-group pt-large">
          <a className="pt-button pt-intent-primary pt-fixed" tabIndex="0" role="button" onClick={() => this.props.setRows(5)}>5</a>
          <a className="pt-button pt-intent-primary" tabIndex="0" role="button" onClick={() => this.props.setRows(10)}>10</a>
          { /* Todo - figure out how to handle active state with pt-active */ }
          <a className="pt-button pt-intent-primary" tabIndex="0" role="button" onClick={() => this.props.setRows(25)}>25</a>
          <a className="pt-button pt-intent-primary" tabIndex="0" role="button" onClick={() => this.props.setRows(50)}>50</a>
        </div>
      </div>
    )
  }
}

// TODO - Add prop types

export default ControlPanel;
