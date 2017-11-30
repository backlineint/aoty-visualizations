import React from 'react';
import PropTypes from 'prop-types';

class AlbumGrid extends React.Component {
  render() {
    return(
      <div>
        {Object.keys(this.props.albums).map(key =>
          <p key={key}>{this.props.albums[key].attributes.title}</p>
        )}
      </div>
    )
  }
}

AlbumGrid.propTypes = {
  albums: PropTypes.array.isRequired,
  rows: PropTypes.number.isRequired
};

export default AlbumGrid;
