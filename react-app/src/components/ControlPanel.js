import React from 'react';

class ControlPanel extends React.Component {
  // Pass props to the constructor / super to access them in the constructor.
  constructor(props) {
    super(props);

    // Create row controls
    const rowOptions = [5, 10, 25, 50];
    const rowControl = {};

    rowOptions.forEach(function(item) {
      if (item === this.props.rows) {
        rowControl[item] = {
          rows: item,
          active: true,
          className: "pt-button pt-intent-primary pt-active"
        };
      }
      else {
        rowControl[item] = {
          rows: item,
          active: false,
          className: "pt-button pt-intent-primary"
        }
      }
    }, this);

    this.state = {
      rowControl
    };
  }

  handleRowChange = (numRows) => {
    this.props.setRows(numRows);
    const rowControl = {...this.state.rowControl};
    // TODO - Is there a better pattern for iterating through an object?
    const rowControlIds = Object.keys(rowControl);
    rowControlIds.map((key) => {
      if (key === numRows) {
        rowControl[key].className = "pt-button pt-intent-primary pt-active";
      }
      else {
        rowControl[key].className = "pt-button pt-intent-primary";
      }
    });
  };

  render() {
    const rowControlIds = Object.keys(this.state.rowControl);
    return (
      // Todo - convert clases to BEM style syntax
      <div className="control-panel">
        <h2>Best of Best Of 2016</h2>
        <p>Number of Results:</p>
        <div className="pt-button-group pt-large pt-fill">
          {/* TODO - Convert this to a render function for readability */}
          {rowControlIds.map(key => <a key={key} className={this.state.rowControl[key].className} tabIndex="0" role="button" onClick={() => this.handleRowChange(key)}>{key}</a>)}
        </div>
      </div>
    )
  }
}

// TODO - Add prop types

export default ControlPanel;
