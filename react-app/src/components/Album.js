import React from 'react';
import PropTypes from 'prop-types';

class Album extends React.Component {
  render() {
    if (this.props.coverImage) {
      const albumLink = 'https://open.spotify.com/album/' + this.props.albumId;
      return(
        <div className="pt-card pt-elevation-1 pt-interactive">
          <a href={albumLink} target="_blank">
          <img
            src={this.props.coverImage}
            alt={this.props.title}
          />
          </a>
        </div>
      )
    }
    else {
      return(
        <div className="pt-card pt-elevation-1 pt-interactive">
          {this.props.title}
        </div>
      )
    }
  }
}

Album.propTypes = {
  title: PropTypes.string.isRequired,
  coverImage: PropTypes.string
};

export default Album;
