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
  Code
} from 'spectacle';

// Import code slide
import CodeSlide from 'spectacle-code-slide';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');
require('prismjs/themes/prism.css');

const images = {
  briami: require('./assets/briami.jpg'),
  cornMaze: require('./assets/corn_maze.png'),
  clients: require('./assets/clients.png'),
  hs2: require('./assets/hs2.png'),
  switchedLogo: require('./assets/switched_on_pop.png'),
  switchedEp: require('./assets/switched_ep.png'),
  spreadsheet: require('./assets/spreadsheet.png'),
  driesnote: require('./assets/driesnote.jpg'),
  react: require('./assets/react.jpg'),
  d8: require('./assets/d8.png'),
  reactIcon: require('./assets/react_icon.png'),
  flowChart: require('./assets/flowchart-full.jpg'),
  flowChartTop: require('./assets/flowchart-top.jpg'),
  flowChartMiddle: require('./assets/flowchart-middle.jpg'),
  contentaLogo: require('./assets/contenta-logo.png'),
  reservoirLogo: require('./assets/reservoir-logo.png'),
  contentaMenu: require('./assets/contenta_menu.png'),
  reservoirMenu: require('./assets/reservoir_menu.png'),
  apiDoc: require('./assets/api_doc.png'),
  postmanResponse: require('./assets/postman_response.png'),
  publishToWeb: require('./assets/publish-to-web.png'),
  sheetsResponse: require('./assets/sheets-response.png')
};

const albums = {
  commonSense: require('./assets/albums/common_sense.jpeg'),
  ctrl: require('./assets/albums/ctrl.jpeg'),
  americanDream: require('./assets/albums/american_dream.jpeg'),
  drunk: require('./assets/albums/drunk.jpeg'),
};

// Todo - preload images. See utils in specatcle repo.
// preloader(images);

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
`;

// Todo - start splitting slides out into sections/components.

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
          <Heading fit>HOT JAMS(tack)</Heading>
          <Heading fit caps textColor="primary">Building a Music Discovery App with Drupal and React</Heading>
        </Slide>

        <Slide
          notes="This is the time I forced my 6 yr old son to run 3 miles in the pouring
          rain. Dad of the year contender right here."
        >
          <Layout>
            <Fill>
              <Heading size={1} caps>Brian Perry</Heading>
              <List>
                <CustomListItem>Interactive Developer at HS2 Solutions</CustomListItem>
                <CustomListItem>Rocking the Chicago suburbs</CustomListItem>
                <CustomListItem>Lover of all things components</CustomListItem>
                <CustomListItem>... and Nintendo</CustomListItem>
              </List>
              <CustomText>d.o: brianperry</CustomText>
              <CustomText>twitter: bricomedy</CustomText>
              <CustomText>github: backlineint</CustomText>
              <CustomText>nintendo: wabrian</CustomText>
            </Fill>
            <Fill>
              <Image
                bgImage={images.cornMaze}
                height="94vh"
                width="50vw"
              />
            </Fill>
          </Layout>
        </Slide>

        <Slide
          bgColor="secondary"
          notes="We focus on digital transformation. I didn't have time to sync up
          with marketing, but I'm pretty sure that is what happens when a car turns into a giant robot.
          Then standard stuff about great Drupal, great Drupal people."
        >
          <Layout>
            <Fill>
              <Heading caps size={1}>HS2 Solutions</Heading>
              <Image
                src={images.clients}
                margin="50px"
              />
            </Fill>
            <Fill>
              <Image
                bgImage={images.hs2}
                height="94vh"
                width="50vw"
              />
            </Fill>
          </Layout>
        </Slide>

        <Slide
          transition={['slide']}
          notes="It's a little bit of a walk, but let me tell you how I fell into
          the project we're going to be talking about...
          Todo - maybe re-theme to album quote concept. Or maybe that is two slides.
          TODO - Style quote to make side line white"
        >
          <Heading textColor="secondary" bgColor="tertiary" padding="15px">Origin of a Side Project</Heading>
          <Layout>
            <Fill>
              <BlockQuote textColor="secondary">
                <Quote textColor="secondary">And luck is always better than skill at things</Quote>
                <Quote textColor="secondary">We're flying blind</Quote>
                <Quote textColor="secondary">Oh good gracious</Quote>
                <Quote textColor="secondary">I sound like my mom</Quote>
                <Cite>LCD Soundystem - tonite</Cite>
                <Text margin="15px 0 0 0" textColor="secondary" textAlign="left">Album: American Dream (#6 of 2017)</Text>
              </BlockQuote>
            </Fill>
            <Fill>
              <Image src={albums.americanDream} />
            </Fill>
          </Layout>
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

        <Slide
          bgImage={images.spreadsheet}
          notes="... where he takes all off the music critics best of lists and aggregates them
          into one best-of-best-of list crowning an undeniable critical darling.
          Sure, spreasheets are ugly, but a lot of love and data goes into this one.
          different averages, a calculated score for consensus, metadata about the albums
          and lists, and so on. So in the back of my mind (and deep in my evernote) I
          really wanted to use this awesome dataset for something fun."
        >
        </Slide>

        <Slide
          transition={['slide']}
          bgImage={images.driesnote}
          bgDarken={0.75}
          notes="Meanwhile in the Drupal communtity I'm hearing decoupled, decoupled,
          decoupled and had been looking for a good way to learn more"
        >
          <Appear>
            <Heading size={1} caps fit textColor="secondary">
              Decoupled
            </Heading>
          </Appear>
          <Appear>
            <Heading size={1} caps fit>
              Progressively Decoupled
            </Heading>
          </Appear>
          <Appear>
            <Heading size={1} caps fit textColor="secondary">
              Fully Decoupled
            </Heading>
          </Appear>
          <Appear>
            <Heading size={1} caps fit>
              We don't say 'headless' anymore
            </Heading>
          </Appear>
          <Appear>
            <Heading size={1} caps fit textColor="secondary">
              Decoupled
            </Heading>
          </Appear>
          <Appear>
            <Heading size={1} caps fit>
              Decoupled decoupled decoupled decoupled
            </Heading>
          </Appear>
        </Slide>

        <Slide
          transition={['slide']}
          bgImage={images.react}
          bgDarken={0.25}
          notes="In JS Framework-vile I'm hearing React, React, React. Some people
          are shouting Vue too, but man, so much React"
        >
          <Appear>
            <Heading size={1} caps fit>
              React
            </Heading>
          </Appear>
          <Appear>
            <Heading size={1} caps fit textColor="secondary">
              React and Redux
            </Heading>
          </Appear>
          <Appear>
            <Heading size={1} caps fit>
              I'm sure vue is great but...
            </Heading>
          </Appear>
          <Appear>
            <Heading size={1} caps fit textColor="secondary">
              So many people are talking about react
            </Heading>
          </Appear>
          <Appear>
            <Heading size={1} caps fit>
              React react react react react react
            </Heading>
          </Appear>
        </Slide>

        <Slide
          bgColor="secondary"
          notes="Seemed like a great opportunity to jam all of these things together
          and see what I could learn about this whole decoupled Drupal thing."
        >
          <Layout>
            <Fill>
              <Heading caps>Data</Heading>
              <Image src={images.spreadsheet} />
            </Fill>
            <Fill>
              <Heading caps>Drupal</Heading>
              <Image src={images.d8} />
            </Fill>
            <Fill>
              <Heading caps>React</Heading>
              <Image src={images.reactIcon} />
            </Fill>
          </Layout>
          <Heading textColor="primary">Let's Jam (them all together)</Heading>
        </Slide>

        <Slide
          transition={['slide']}
          notes="TODO - Style quote to make side line white"
        >
          <Heading textColor="secondary" bgColor="tertiary" padding="15px">Choosing a Decoupled Architecture</Heading>
          <Layout>
            <Fill>
              <BlockQuote textColor="secondary">
                <Quote textColor="secondary">Don't think I'm shy 'cause I'm quiet</Quote>
                <Quote textColor="secondary">I'm just plottin', I'm plottin'</Quote>
                <Quote textColor="secondary">I got dem where I want dem</Quote>
                <Cite>J Hus - Plottin</Cite>
                <Text margin="15px 0 0 0" textColor="secondary" textAlign="left">Album: Common Sense (#30 of 2017)</Text>
              </BlockQuote>
            </Fill>
            <Fill>
              <Image src={albums.commonSense} />
            </Fill>
          </Layout>
        </Slide>

        <Slide
          notes="Here are the flavors, so how do we decide what is right for us."
        >
          <Heading>The Flavors</Heading>
          <List>
            <CustomListItem><S type="bold" textColor="tertiary">Fully Coupled</S> - All Drupal all the time, baby</CustomListItem>
            <Appear><CustomListItem><S type="bold" textColor="tertiary">Progressively Decoupled</S> - Drupal with strategically sprinkled JavaScript flavor</CustomListItem></Appear>
            <Appear><CustomListItem><S type="bold" textColor="tertiary">Fully Decoupled</S> - JS framework of choice is in control and communicates with Drupal as necessary for content</CustomListItem></Appear>
          </List>
        </Slide>

        <Slide
          bgColor="secondary"
          notes="Holy flow chart."
        >
          <Image src={images.flowChart} />
        </Slide>

        <Slide
          bgColor="secondary"
          transition={['zoom']}
          notes="..."
        >
          <Image src={images.flowChartTop} />
        </Slide>

        <Slide
          bgColor="secondary"
          transition={['zoom']}
          notes="..."
        >
          <Image src={images.flowChartMiddle} />
        </Slide>

        <Slide
          transition={['slide']}
          notes="TODO - Style quote to make side line white"
        >
          <Heading textColor="secondary" bgColor="tertiary" padding="15px">Choosing a Drupal Distribution</Heading>
          <Layout>
            <Fill>
              <BlockQuote textColor="secondary">
                <Quote textColor="secondary">Maybe I should pray a little harder</Quote>
                <Quote textColor="secondary">Or work a little smarter</Quote>
                <Quote textColor="secondary">This time baby promise I have learned my lesson ooh</Quote>
                <Cite>SZA - Anything</Cite>
                <Text margin="15px 0 0 0" textColor="secondary" textAlign="left">Album: CTRL (#2 of 2017)</Text>
              </BlockQuote>
            </Fill>
            <Fill>
              <Image src={albums.ctrl} />
            </Fill>
          </Layout>
        </Slide>

        <Slide
          bgColor="secondary"
          notes="."
        >
          <Heading textColor="secondary" bgColor="tertiary" padding="15px">Your Options</Heading>
          <Layout>
            <Fill>
              <Heading caps>Reservoir</Heading>
              <Image src={images.reservoirLogo} />
            </Fill>
            <Fill>
              <Heading caps>Contenta</Heading>
              <Image src={images.contentaLogo} />
            </Fill>
            <Fill>
              <Heading caps>Drupal</Heading>
              <Image src={images.d8} />
            </Fill>
          </Layout>
          <Text textColor="primary" textAlign="left" margin="0 0 0 8%">* Also Headless Lightning</Text>
        </Slide>

        <Slide
          notes="Things they have in common...
          Contenta's API is focused around content models and the API
          Reservoir is stripped down to the bare essentials."
        >
          <Heading>API Focused Admin UIs</Heading>
          <Image src={images.contentaMenu} />
          <Image src={images.reservoirMenu} />
        </Slide>

        <Slide
          notes="Self documenting API via ReDoc"
        >
          <Heading>Automatic API Documentation</Heading>
          <Image src={images.apiDoc} />
        </Slide>

        <Slide
          notes="Oh yeah, they expose APIs too"
        >
          <Heading>JSON API</Heading>
          <Image src={images.postmanResponse} />
        </Slide>

        <Slide
          bgColor="secondary"
          notes="We also need to evaluate these things based on their slogans..."
        >
          <Layout>
            <Fill>
              <Heading>Reservoir</Heading>
              <Text>"A back end for your front end"</Text>
              <Image src={images.reservoirLogo} />
            </Fill>
            <Fill>
              <Text>You might reach for Resevoir if...</Text>
              <BigList lightBackground>
                <ListItem>You want the quickest path to a Drupal based API</ListItem>
                <ListItem>Nodes and node types alone can meet your needs</ListItem>
                <ListItem>You won't miss your Drupalisms</ListItem>
              </BigList>
            </Fill>
          </Layout>
        </Slide>

        <Slide
          bgColor="secondary"
        >
          <Layout>
            <Fill>
              <Heading>Contenta</Heading>
              <Text>"Contenta makes your content happy"</Text>
              <Image src={images.contentaLogo} />
            </Fill>
            <Fill>
              <Text>You might reach for Contenta if...</Text>
              <BigList lightBackground>
                <ListItem>You want to use vocabularies, comments, media</ListItem>
                <ListItem>You want a more drupal like approach to extending and customizing</ListItem>
                <ListItem>You want example content and consumers to experiment with</ListItem>
              </BigList>
            </Fill>
          </Layout>
        </Slide>

        <Slide
          bgColor="secondary"
        >
          <Layout>
            <Fill>
              <Heading>Roll Your Own</Heading>
              <Text>"For the DYI-ers"</Text>
              <Image src={images.d8} />
            </Fill>
            <Fill>
              <Text>Sure, you could just build it yourself...</Text>
              <BigList lightBackground>
                <ListItem>JSON API</ListItem>
                <ListItem>Open API and ReDoc</ListItem>
                <ListItem>Simple OAuth</ListItem>
                <ListItem>Many other odds and ends</ListItem>
              </BigList>
              <Text>But really, why would you?</Text>
              <Text>Pray a little harder / work a little smarter...</Text>
            </Fill>
          </Layout>
        </Slide>

        <Slide
          bgColor="secondary"
          notes="Looking back at this slide, things go left to right in order of flexibility and complexity"
        >
          <Layout>
            <Fill>
              <Heading caps>Reservoir</Heading>
              <Image src={images.reservoirLogo} />
            </Fill>
            <Fill>
              <Heading caps>Contenta</Heading>
              <Image src={images.contentaLogo} />
            </Fill>
            <Fill>
              <Heading caps>Drupal</Heading>
              <Image src={images.d8} />
            </Fill>
          </Layout>
          <Text textColor="primary" textAlign="left" margin="0 0 0 8%">* Also Headless Lightning</Text>
        </Slide>

        <Slide
          bgColor="secondary"
          notes="We also need to evaluate these things based on their slogans..."
        >
          <Layout>
            <Fill>
              <Heading>I Chose...</Heading>
              <Image src={images.reservoirLogo} />
              <Heading size={3}>Reservoir</Heading>
            </Fill>
            <Fill>
              <BigList lightBackground>
                <ListItem>Had very simple needs</ListItem>
                <ListItem>Worked with no config (may have been a little early on Contenta)</ListItem>
                <ListItem>But I've used Contenta since</ListItem>
              </BigList>
            </Fill>
          </Layout>
        </Slide>

        <Slide
          transition={['slide']}
          notes="TODO - Style quote to make side line white"
        >
          <Heading textColor="secondary" bgColor="tertiary" padding="15px">Migrate to the Rescue</Heading>
          <Layout>
            <Fill>
              <BlockQuote textColor="secondary">
                <Quote textColor="secondary">Your heart is struggling, baby</Quote>
                <Quote textColor="secondary">Trying to believe</Quote>
                <Quote textColor="secondary">That there might be something you just couldn't see</Quote>
                <Quote textColor="secondary">But what if I told you babe</Quote>
                <Quote textColor="secondary">It’s all so easy</Quote>
                <Cite>Kenny Loggins - Show You the Way</Cite>
                <Text margin="15px 0 0 0" textColor="secondary" textAlign="left">Album: Drunk (#11 of 2017)</Text>
              </BlockQuote>
            </Fill>
            <Fill>
              <Image src={albums.drunk} />
            </Fill>
          </Layout>
        </Slide>

        <Slide
          notes="While we're on Thundercat, this song also contains some good advice for conference
          attendees who plan on socializing."
        >
          <BlockQuote>
            <Quote textColor="secondary">
              Hey, how's it going? This is your boy, Thundercat. If you're going to fill your water bottle with vodka, 
              always make sure you have a friend with a bottle that actually has water in it.
            </Quote>
          </BlockQuote>
        </Slide>

        <Slide

          notes=""
        >
          <Heading textColor="secondary">So how the hell do we get...</Heading>
          <Layout>
            <Fill>
              <Heading caps>Data</Heading>
              <Image src={images.spreadsheet} />
            </Fill>
            <Fill>
              <Heading caps>&rarr;</Heading>
            </Fill>
            <Fill>
              <Heading caps>Drupal</Heading>
              <Image src={images.d8} />
            </Fill>
          </Layout>
        </Slide>

        <Slide
          notes="todo: fix the code portion - style and indent."
        >
          <Heading>Drupal Migrate to the Rescue!</Heading>
          <BigList>
            <ListItem>Created custom migrate module</ListItem>
            <ListItem>Installs Album content type.</ListItem>
            <ListItem><Code>drupal config:export --remove-uuid --remove-config-hash</Code></ListItem>
            <ListItem>Pulls data directly from Google Spreadsheet</ListItem>
            <ListItem>Augments with data from Spotify API</ListItem>
          </BigList>
        </Slide>

        <Slide
          notes=""
        >
          <Heading>Google Sheet JSON Hack</Heading>
          <Image height="75vh" src={images.publishToWeb} />
        </Slide>

        <Slide>
          <Heading fit>https://spreadsheets.google.com/feeds/list/(DocumentID)/1/public/full?alt=json</Heading>
          <Image src={images.sheetsResponse} />
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="yaml"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/migration_config.example")}
          // Can't believe I have to include this inlne, but here we are...
          ranges={[
            { loc: [0, 10], title: "Queue Stack" },
            { loc: [12, 17], note: "Yeah, part 1" },
            { loc: [25, 26], note: "Killing it." }
          ]}
          notes="Notes are still ok"
        />

        <Slide
          notes="More like mi-great"
        >
          Migrate terminal!
        </Slide>

        <Slide
          notes="Props are external forces acting on a component. Like your mom
          buying you a halloween costume.  You're going to be a ghost. Here's all
          the stuff you need to be a ghost. Cool.  I'm a ghost now.
          Or maybe use the dinos photo - my neighbor said, we should be inflatable 
          "
        >
          Props and state slide.  Way in the future.
        </Slide>

        <Slide
          notes="State what the component knows to be true about itself. Like how
          in high school I thought I was a punk rock kid, even though I lived in Cranston
          Rhode Island. You might give me other props, but until I decide otherwise
          I'm still a punk rock kid. Slide of me with crazy hair.  (I still contend
          that the ska-punk scene in Providence was really great btw.)"
        >
          State
        </Slide>

        <Slide
          notes="spotify playlist with all songs referenced in slides, and then some of my other favorites from 2017"
        >
          Spotify Playlist
        </Slide>

      </Deck>
    );
  }
}
