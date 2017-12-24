import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();

    const lists = {
      rtrade: {
        label: 'Rough Trade',
        link: 'https://roughtrade.com/us/albums-of-the-year'
      }
    };

    this.state = {
      lists
    };
  }

  render() {
    if (this.props.rank < 101) {
      return(
        <div>
          <a href={this.state.lists[this.props.list].link} target="_blank">{this.state.lists[this.props.list].label}</a>: {this.props.rank}
        </div>
      )
    }
    else {
      return(
        null
      )
    }
  }
}

Ranking.propTypes = {
  list: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired
};

export default Ranking;
