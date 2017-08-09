import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, Checkbox } from '@blueprintjs/core';
// /import _filter from 'lodash/filter';

class Facet extends React.Component {
  constructor(props) {
    super(props);

    const facetControl = {};
    this.props.facets.map((facet, key) => {
      return facetControl[key] = {
        value: facet,
        checked: false
      }
    });

    this.state = {
      facetControl,
      isOpen: false,
    };
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleEnabledChange = (e, key) => {
    // Update the checked state of the facet.
    const facetControl = {...this.state.facetControl};
    facetControl[key].checked = !facetControl[key].checked;
    // If facet is selected, filter for it, otherwise remove the filter.
    if (facetControl[key].checked) {
      this.props.filterAlbums(e.target.value);
    }
    else {
      this.props.filterAlbums('');
    }
    // TODO - Update facet genre list.
    this.setState({facetControl});
    // Todo - handle multiple selected filters
  };

  render() {
    const facetControlIds = Object.keys(this.state.facetControl);
    return (
      <div>
        <Button onClick={this.handleClick}>
          {this.state.isOpen ? "Hide" : "Show"} {this.props.name}
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          {/* Todo - Make this a controlled component to persist checkbox state */}
            {facetControlIds.map(key =>
              <Checkbox
                key={key}
                value={this.state.facetControl[key].value}
                checked={this.state.facetControl[key].checked}
                onChange={(e) => this.handleEnabledChange(e, key)}
              >
                {this.state.facetControl[key].value}
              </Checkbox>
            )}
        </Collapse>
      </div>
    );
  }

}

Facet.propTypes = {
  name: PropTypes.string.isRequired,
  facets: PropTypes.array,
  filterAlbums: PropTypes.func.isRequired
};

export default Facet;