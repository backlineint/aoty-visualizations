import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, Checkbox } from '@blueprintjs/core';

class Facet extends React.Component {
  constructor(props) {
    super(props);

    const facetControl = {};
    this.props.facets.map((facet, key) => {
      return facetControl[facet] = {
        value: facet,
        checked: false
      }
    });

    this.state = {
      facetControl,
      isOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // Update the facet list based on what albums have been selected
    const facetControl = {};
    nextProps.facets.map((facet, key) => {
      return facetControl[facet] = {
        value: facet,
        checked: this.state.facetControl[facet] !== undefined ? this.state.facetControl[facet] : false
      }
    });
    this.setState({facetControl});
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleEnabledChange = (e, key) => {
    // Update the checked state of the facet.
    const facetControl = {...this.state.facetControl};
    facetControl[key].checked = !facetControl[key].checked;
    this.setState({facetControl});
    // If facet is selected, filter for it, otherwise remove the filter.
    // Todo - handle multiple selected filters
    if (this.state.facetControl[key].checked) {
      this.props.filterAlbums(e.target.value);
    }
    else {
      this.props.filterAlbums('');
      const facetControl = this.state.facetControl;
      facetControl[key] = false;
      this.setState({facetControl});

    }
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