import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();

    const lists = {
      rtrade: {
        label: 'Rough Trade',
        link: 'https://roughtrade.com/us/albums-of-the-year'
      },
      q: {
        label: 'Q',
        link: 'https://www.qthemusic.com/articles/when-liam-met-ed-the-new-issue-out-on-tuesday'
      },
      rstone: {
        label: 'Rolling Stone',
        link: 'http://www.rollingstone.com/music/lists/50-best-albums-of-2017-w511763'
      },
      paste: {
        label: 'Paste',
        link: 'https://www.pastemagazine.com/articles/2017/11/the-50-best-albums-of-2017.html'
      },
      nme: {
        label: 'NME',
        link: 'http://www.nme.com/list/nmes-albums-of-the-year-2017-2161481'
      },
      mojo: {
        label: 'Mojo',
        link: 'https://www.mojo4music.com/articles/mojo-290-january-2018'
      },
      drwnd: {
        label: 'Drowned In Sound',
        link: 'http://drownedinsound.com/in_depth/4151506-drowned-in-sounds-favourite-albums-of-2017'
      },
      cos: {
        label: 'Consequence of Sound',
        link: 'https://consequenceofsound.net/2017/11/top-50-albums-of-2017/'
      },
      uncut: {
        label: 'Uncut',
        link: 'http://www.uncut.co.uk/publication/uncut/january-2018'
      },
      skinny: {
        label: 'The Skinny',
        link: 'http://www.theskinny.co.uk/music/opinion/albums-of-the-year/the-skinny-top-50-albums-of-2017'
      },
      cmplx: {
        label: 'Complex',
        link: 'http://www.complex.com/music/best-albums-2017/'
      },
      crack: {
        label: 'Crack Magazine',
        link: 'https://crackmagazine.net/article/feature-lists/albums-2017-100-51/'
      },
      gvsb: {
        label: 'Gorilla vs Bear',
        link: 'http://www.gorillavsbear.net/gorilla-vs-bears-albums-of-2017/'
      },
      noisey: {
        label: 'Noisey',
        link: 'https://noisey.vice.com/en_us/article/pazbwn/noisey-100-best-albums-of-2017'
      },
      quietus: {
        label: 'The Quietus',
        link: 'http://thequietus.com/articles/23660-albums-of-the-year-2017'
      },
      strgum: {
        label: 'Stereogum',
        link: 'https://www.stereogum.com/featured/the-50-best-albums-of-2017/'
      },
      uproxx: {
        label: 'Uproxx',
        link: 'http://uproxx.com/music/best-albums-of-2017-ranked-list/'
      },
      vnlfct: {
        label: 'The Vinyl Factory',
        link: 'https://thevinylfactory.com/features/best-albums-2017/'
      },
      wire: {
        label: 'Wire',
        link: 'https://www.thewire.co.uk/issues/407'
      },
      popmat: {
        label: 'Pop Matters',
        link: 'https://www.popmatters.com/60-best-albums-of-2017-2516162820.html'
      },
      pfork: {
        label: 'Pitchfork',
        link: 'https://pitchfork.com/features/lists-and-guides/the-50-best-albums-of-2017/'
      },
      npr: {
        label: 'NPR',
        link: 'https://www.npr.org/2017/12/12/568400855/the-50-best-albums-of-2017'
      },
      spin: {
        label: 'Spin',
        link: 'https://www.spin.com/featured/50-best-albums-2017/'
      },
      line: {
        label: 'The Line of Best Fit',
        link: 'https://www.thelineofbestfit.com/features/listomania/best-albums-of-2017'
      },
      tmt: {
        label: 'Tiny Mix Tapes',
        link: 'https://www.tinymixtapes.com/features/2017-favorite-50-music-releases'
      },
      altern: {
        label: 'The Alternative',
        link: 'http://www.getalternative.com/alternatives-top-50-releases-2017-3/'
      },
      fact: {
        label: 'Fact',
        link: 'http://www.factmag.com/2017/12/20/best-albums-2017/'
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
