// Import React
import React from 'react';
import styled, { css } from 'styled-components';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Layout,
  Fill,
  Image,
  Appear,
  S,
  Link,
  ComponentPlayground
} from 'spectacle';

import CodeSlide from 'spectacle-code-slide';
import Terminal from "spectacle-terminal";

import Album from './components/Album';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

import './assets/css/fixes.css';
import './assets/css/emoji.css'; // https://afeld.github.io/emoji-css/

// Require CSS
require('normalize.css');
require('prismjs/themes/prism.css');

const images = {
  briami: require('./assets/briami.jpg'),
};

const theme = createTheme(
  {
    primary: '#1F2022',
    secondary: 'white',
    tertiary: '#03A9FC',
    quartenary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

const BigList = styled(List)`
  li {
    font-size: 4rem !important;
    margin-bottom: 1.5rem;
    color: white;
    ${props => props.lightBackground && css`
      color: black;
    `}  
  }
`;

const CustomListItem = styled(ListItem)`
  font-size: 4rem !important;
  margin-bottom: 1.5rem;
  color: white;
  ${props => props.lightBackground && css`
    color: black;
  `}
`;

const CustomText = styled(Text)`
  font-size: 4rem !important;
  margin-bottom: 1.5rem !important;
  color: white !important;
  ${props => props.lightBackground && css`
    color: black !important;
  `}
`;

const CapHeading = styled(Heading)`
  text-align: left;
  color: white !important;
  font-size: 175px !important;
  ::first-letter {
    color: #03A9FC !important;
  }
`;

const CoverLayout = styled.div`
  h1 {
    margin-bottom: 3rem;
  }
  blockquote span {
    border-left: 1px solid white
  }
  img {
    border: 5px solid;
  }
`;

const HovCoverLayout = styled.div`
  p {
    margin: 1.5rem 0;
  }
  blockquote span {
    border-left: 1px solid white;
  }
  img {
    border: 5px solid;
  }
`;

const MarginHeading = styled(Heading)`
  margin-bottom: 3rem !important;
`;

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['fade']}
        transitionDuration={500}
        theme={theme}
        controls={false}
        progress="bar"
        contentHeight="97vh"
        contentWidth="95vw"
      >
        <Slide
          transition={['slide']}
          bgColor="secondary"
          notes="Maybe take a quick decouped / react poll here."
        >
          <Heading fit>Storybook</Heading>
          <Heading fit caps textColor="primary">An Interactive Pattern Library for Your Decoupled Applications</Heading>
          <Link href="http://bit.ly/hot-jams" target="_blank"><S type="underline"><Text textSize="50px" margin="3rem 0 0 0">http://bit.ly/tbd</Text></S></Link>
        </Slide>

      </Deck>
    );
  }
}
