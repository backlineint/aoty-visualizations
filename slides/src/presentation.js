// Import React
import React from 'react';

// /import styled from 'styled-components';

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
  Appear
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');

const images = {
  briami: require('./assets/briami.jpg'),
  cornMaze: require('./assets/corn_maze.png'),
  clients: require('./assets/clients.png'),
  hs2: require('./assets/hs2.png'),
  switchedLogo: require('./assets/switched_on_pop.png'),
  switchedEp: require('./assets/switched_ep.png'),
};

// Todo - preload images. See utils in specatcle repo.
// preloader(images);

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quartenary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

// Todo - start splitting slides out into sections/components.

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['slide']}
        transitionDuration={500}
        theme={theme}
        contentHeight="100vh"
        contentWidth="100vw"
      >
        <Slide
          bgColor="tertiary"
          notes="These are notes"
        >
          <Heading textColor="primary">Hot JAMS(tack)</Heading>
          <Text>Building a Music Discovery App with Drupal and React</Text>
        </Slide>

        <Slide
          notes="This is the time I forced my 6 yr old son to run 3 miles in the pouring
          rain. Dad of the year contender right here."
        >
          <Layout>
            <Fill>
              <Heading size={2} textColor="tertiary">Brian Perry</Heading>
              <List>
                <ListItem>Interactive Developer at HS2 Solutions</ListItem>
                <ListItem>Rocking the Chicago suburbs</ListItem>
                <ListItem>Lover of all things components</ListItem>
                <ListItem>... and Nintendo</ListItem>
              </List>
              <Text>d.o: brianperry</Text>
              <Text>twitter: bricomedy</Text>
              <Text>github: backlineint</Text>
              <Text>nintendo: wabrian</Text>
            </Fill>
            <Fill>
              <Image
                bgImage={images.cornMaze}
                height="97vh"
                width="50vw"
              />
            </Fill>
          </Layout>
        </Slide>

        <Slide>
          <Layout>
            <Fill>
              <Heading size={2} textColor="tertiary">HS2 Solutions</Heading>
              <Image
                src={images.clients}
                margin="50px"
              />
            </Fill>
            <Fill>
              <Image
                bgImage={images.hs2}
                height="97vh"
                width="50vw"
              />
            </Fill>
          </Layout>
        </Slide>

        <Slide
          bgColor="tertiary"
          notes="It's a little bit of a walk, but let me tell you how I fell into
          the project we're going to be talking about...
          Todo - maybe re-theme to album quote concept. Or maybe that is two slides."
        >
          <Heading textColor="primary">Origin of a Side Project</Heading>
        </Slide>

        <Slide
          bgImage={images.briami}
          notes="I used to do comedy, but like many comedians I secretly wanted to be in a band.
          This is me performing my solo musical show Briami Sound Machine which even though
          it often led to walkouts, I secretly wanted to be the greatest frontman of all time.
          One of the comedians I collaborated with in Boston was a friend named Chris Duffy..."
        ></Slide>

        <Slide
          bgColor="#f2385a"
          notes="Chris went to college with one of the guys behind the podcast Switched On Pop.
          It breaks down popular music in amazing music nerd detail.  Super cool stuff.
          One episode featured guest Rob Mitchum talking about the album of the year list,
          which is this big ugly google spreadsheet...
          todo - style padding between images."
        >
          <Image
            src={images.switchedLogo}
            width="50%"
          />
          <Appear>
            <Image
              src={images.switchedEp}
              width="70%"
            />
          </Appear>
        </Slide>

        <Slide>
          Album of the year spreadsheet image.
        </Slide>

        <Slide>
          <Text>Remaining slides are from boilerplate</Text>
        </Slide>

        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Spectacle Boilerplate
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            open the presentation/index.js file to get started
          </Text>
        </Slide>
        <Slide transition={['fade']} bgColor="tertiary">
          <Heading size={6} textColor="primary" caps>
            Typography
          </Heading>
          <Heading size={1} textColor="secondary">
            Heading 1
          </Heading>
          <Heading size={2} textColor="secondary">
            Heading 2
          </Heading>
          <Heading size={3} textColor="secondary">
            Heading 3
          </Heading>
          <Heading size={4} textColor="secondary">
            Heading 4
          </Heading>
          <Heading size={5} textColor="secondary">
            Heading 5
          </Heading>
          <Text size={6} textColor="secondary">
            Standard text
          </Text>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Standard List
          </Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
