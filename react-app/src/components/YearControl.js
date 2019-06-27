import React from 'react';
import PropTypes from 'prop-types';

class YearControl extends React.Component {
  handleYearChange = (e) => {
    // Todo:
    // X Update select
    // Update selected year in app
    // Reset all filter controls in control panel
    // Call function to hit API and refresh data
    // Toggle spinner

    this.props.updateSelected(e.target.value);
    this.props.selectYear(e.target.value);
    // Why doesn't this force a re-render?
    this.props.getAlbums();
    // this.props.unsetSelected('none');
    // this.props.sortAlbums(e.target.value, this.props.sortControl.options[e.target.value].defaultSort);
  };

  render() {
    const yearOptions = Object.keys(this.props.yearControl.options);
    return(
      <label className="pt-label">
        {this.props.label}
        <div className="pt-select pt-minimal pt-large">
          <select value={this.props.value} onChange={this.handleYearChange}>
            {yearOptions.map(key =>
              <option
                key={key}
                value={this.props.yearControl.options[key].year}
              >
                {this.props.yearControl.options[key].year}
              </option>
            )}
          </select>
        </div>
      </label>
    )
  }
}

YearControl.propTypes = {
  label: PropTypes.string,
  yearControl: PropTypes.object.isRequired,
  value: PropTypes.string
};

export default YearControl;
