import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Button } from "@blueprintjs/core";

const RowControlWrapper = styled.div`
 margin-bottom: 1rem;
`;

class RowControl extends React.Component {
  render() {
    return(
      <RowControlWrapper>
        <p>{this.props.label}</p>
        <div className="pt-button-group pt-large pt-fill">
          {Object.keys(this.props.rowControl).map(key =>
            <Button
              key={key}
              active={this.props.rowControl[key].active}
              disabled={this.props.rowControl[key].disabled}
              onClick={() => this.props.setRows(this.props.rowControl[key].rows)}
            >
              {key}
            </Button>
          )}
        </div>
      </RowControlWrapper>
    )
  }
}

RowControl.propTypes = {
  label: PropTypes.string,
  rowControl: PropTypes.object.isRequired,
  setRows: PropTypes.func.isRequired
};

export default RowControl;