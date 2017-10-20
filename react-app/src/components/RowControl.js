import React from 'react';
import PropTypes from 'prop-types';

import { Button } from "@blueprintjs/core";

class RowControl extends React.Component {
  render() {
    return(
      <div>
        <p>{this.props.label}</p>
        <div className="pt-button-group pt-large pt-fill">
          {Object.keys(this.props.rowControl).map(key =>
            <Button
              key={key}
              active={this.props.rowControl[key].active}
              onClick={() => this.props.handleRowChange(this.props.rowControl[key].rows)}
            >
              {key}
            </Button>
          )}
        </div>
      </div>
    )
  }
}

RowControl.propTypes = {
  label: PropTypes.string,
  rowControl: PropTypes.object.isRequired,
  handleRowChange: PropTypes.func.isRequired
};

export default RowControl;