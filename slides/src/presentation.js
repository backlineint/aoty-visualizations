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
  cornMaze: require('./assets/corn_maze.jpg'),
  clientList: require('./assets/client_list.png'),
  clients: require('./assets/clients.png'),
  hs2: require('./assets/hs2.png'),
  switchedLogo: require('./assets/switched_on_pop.png'),
  switchedEp: require('./assets/switched_ep.png'),
  spreadsheet: require('./assets/spreadsheet.png'),
  driesnote: require('./assets/driesnote.jpg'),
  react: require('./assets/react.jpg'),
  d8: require('./assets/d8.png'),
  reactIcon: require('./assets/react_icon.png'),
  ddos: require('./assets/ddos.png'),
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
  sheetsResponse: require('./assets/sheets-response.png'),
  migrateContent: require('./assets/migrate_content.png'),
  drupalAlbum: require('./assets/drupal_album.png'),
  aotyApp: require('./assets/aoty_app.png'),
  dinos: require('./assets/dinos.jpg'),
  car: require('./assets/car.jpg'),
  state1: require('./assets/state1.png'),
  state2: require('./assets/state2.png'),
  state3: require('./assets/state3.png'),
  colin: require('./assets/colin.jpg'),
  concerns: require('./assets/concerns.png'),
};

const albums = {
  commonSense: require('./assets/albums/common_sense.jpeg'),
  ctrl: require('./assets/albums/ctrl.jpeg'),
  americanDream: require('./assets/albums/american_dream.jpeg'),
  drunk: require('./assets/albums/drunk.jpeg'),
  jayZ: require('./assets/albums/444.jpg'),
  priests: require('./assets/albums/priests.jpeg'),
  kelela: require('./assets/albums/kelela.jpeg'),
  lorde: require('./assets/albums/lorde.jpeg'),
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

const albumCode = (`
// const warCover = "https://i.scdn.co/image/94ddbce0291c58f6431f52b69820376391c75544";
render(
  <Album
    key="0"
    artist="Kendrick Lamar"
    title="DAMN."
    albumId="4eLPsYPBmXABThSJ821sqY"
    coverImage="https://i.scdn.co/image/f2e751ee3dbfec80737094585f59a76806a51797"
    selectAlbum={() => {}}
    selectedAlbum="0"
    activeAlbum={true}
  />
);
`).trim()

const stateCode =(`
class ControlPanel extends React.Component {
  constructor() {
    super();

    const selectedSort = 'field_cons_score';
    const selectedList = 'none';
    
    this.state = {
      selectedSort,
      selectedList
    };

    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
  }

  handleSortChange(e) {
    this.setState({
      selectedSort: e.target.value,
    });
  }

  handleListChange(e) {
    this.setState({
      selectedList: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h2>Simplified Control Panel</h2>
        <p>this.state.selectedSort: {this.state.selectedSort}</p>
        <p>this.state.selectedList: {this.state.selectedList}</p>
        <select value={this.state.selectedSort} onChange={this.handleSortChange}>
          <option value="field_avg">Average</option>
          <option value="field_cons_score">Consensus Score</option>
        </select>
        <select value={this.state.selectedList} onChange={this.handleListChange}>
          <option value="none">None</option>
          <option value="rolling_stone">Rolling Stone</option>
        </select>
      </div>
    );
  }
}
render(<ControlPanel />);
`)



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
          <Link href="https://github.com/backlineint/aoty-visualizations" target="_blank"><S type="underline"><Text margin="2rem 0 0 0">https://github.com/backlineint/aoty-visualizations</Text></S></Link>
        </Slide>

        <Slide
          notes="This is the time I forced my 6 yr old son to run 3 miles in the pouring
          rain. Dad of the year contender right here."
        >
          <Layout>
            <Fill>
              <Heading caps>Brian Perry</Heading>
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
              <Heading caps>HS2 Solutions</Heading>
              <Image
                src={images.clientList}
                width="60%"
                margin="30px 0 0 20%"
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
          <CoverLayout>
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
          </CoverLayout>
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
            margin="0 auto 5rem auto"
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
          bgDarken={0.5}
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
          notes="Client-side Javascript (specifically not universal or isomorphic
          reusable APIs
          prebuilt markup"
        >
          <Heading textSize="100px" textColor="secondary">
            Hey, isn't this
          </Heading>
          <Heading textSize="100px" textColor="secondary">
            The <S type="bold" textColor="tertiary">JAM</S> Stack?
          </Heading>
          <Appear><CapHeading>JavaScript</CapHeading></Appear>
          <Appear><CapHeading>APIs</CapHeading></Appear>
          <Appear><CapHeading>Markup</CapHeading></Appear>
        </Slide>

        <Slide>
          <Heading>The Promise of the JAM Stack</Heading>
          <BigList>
            <Appear><ListItem>Improved performance</ListItem></Appear>
            <Appear><ListItem>Cheaper, easier scaling</ListItem></Appear>
            <Appear><ListItem>Better developer experience</ListItem></Appear>
            <Appear><ListItem>Higher security</ListItem></Appear>
            <Appear><ListItem>Free pony rides?</ListItem></Appear>
          </BigList>
        </Slide>

        <Slide>
          <MarginHeading fit>The security part sounds pretty good...</MarginHeading>
          <Image src={images.ddos} />
          <CoverLayout>
            <BlockQuote>
              <Quote textColor="secondary">Come for the code, stay for the</Quote>
              <Quote textColor="secondary">community driven DDoS attacks.</Quote>
              <Text margin="15px 0 0 0" textColor="secondary" textAlign="left">- All of us - 3/28/18</Text>
            </BlockQuote>
          </CoverLayout>
        </Slide>

        <Slide
          transition={['slide']}
          notes="TODO - Style quote to make side line white"
        >
          <CoverLayout>
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
          </CoverLayout>
        </Slide>

        <Slide
          notes="Here are the flavors, so how do we decide what is right for us."
        >
          <Heading>The Flavors</Heading>
          <List>
            <CustomListItem><S type="bold" textColor="tertiary">Coupled</S> - All Drupal all the time, baby</CustomListItem>
            <Appear><CustomListItem><S type="bold" textColor="tertiary">Progressively Decoupled</S> - Drupal with strategically sprinkled JavaScript flavor</CustomListItem></Appear>
            <Appear><CustomListItem><S type="bold" textColor="tertiary">Fully Decoupled</S> - JS framework of choice is in control and communicates with Drupal API as necessary for content</CustomListItem></Appear>
          </List>
        </Slide>

        <Slide
          bgColor="secondary"
          notes="..."
        >
          <Image src={images.flowChartMiddle} />
        </Slide>

        <Slide>
          <Heading>My Choice: Fully Decoupled</Heading>
          <BigList>
            <Appear><ListItem>Limited editorial needs</ListItem></Appear>
            <Appear><ListItem>Wanted to go all-in and learn more React</ListItem></Appear>
          </BigList>
        </Slide>

        <Slide
          transition={['slide']}
          notes="TODO - Style quote to make side line white"
        >
          <CoverLayout>
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
          </CoverLayout>
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
          <MarginHeading>API Focused Admin UIs</MarginHeading>
          <Image src={images.contentaMenu} margin="0 auto 4rem auto" />
          <Image src={images.reservoirMenu} />
        </Slide>

        <Slide
          notes="Self documenting API via ReDoc"
        >
          <MarginHeading>Automatic API Documentation</MarginHeading>
          <Image src={images.apiDoc} />
        </Slide>

        <Slide
          notes="Oh yeah, they expose APIs too"
        >
          <MarginHeading>JSON API</MarginHeading>
          <Image src={images.postmanResponse} width="85%" />
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
              <CustomText lightBackground>You might reach for Resevoir if...</CustomText>
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
            <CustomText lightBackground>You might reach for Contenta if...</CustomText>
              <BigList lightBackground>
                <ListItem>You want to use vocabularies, comments, media</ListItem>
                <ListItem>You want a more Drupal like approach to extending and customizing</ListItem>
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
            <CustomText lightBackground>Sure, you could just build it yourself...</CustomText>
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
          notes=""
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
          <CoverLayout>
          <Heading textColor="secondary" bgColor="tertiary" padding="15px">Migrating Our Data</Heading>
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
          </CoverLayout>
        </Slide>

        <Slide
          notes="While we're on Thundercat, this song also contains some good advice for conference
          attendees who plan on socializing."
        >
          <CoverLayout>
            <BlockQuote>
              <Quote textColor="secondary">
                Hey, how's it going? This is your boy, Thundercat. If you're going to fill your water bottle with vodka, 
                always make sure you have a friend with a bottle that actually has water in it.
              </Quote>
            </BlockQuote>
          </CoverLayout>
        </Slide>

        <Slide

          notes=""
        >
          <MarginHeading textColor="secondary">So how the hell do we get...</MarginHeading>
          <Layout>
            <Fill>
              <Heading>Google Sheet</Heading>
              <Image src={images.spreadsheet} />
            </Fill>
            <Fill>
              <Heading caps>&rarr;</Heading>
            </Fill>
            <Fill>
              <Heading>Drupal</Heading>
              <Image src={images.d8} />
            </Fill>
          </Layout>
        </Slide>

        <Slide
          notes="Note about drupal config:export --remove-uuid --remove-config-hash
          todo: fix the code portion - style and indent."
        >
          <Heading>Drupal Migrate to the Rescue!</Heading>
          <BigList>
            <ListItem>Created custom migrate module (also installs album content type)</ListItem>
            <ListItem>Pulls data directly from Google Spreadsheet using migrate_plus JSON</ListItem>
            <ListItem>Augments with data from Spotify API</ListItem>
          </BigList>
        </Slide>

        <Slide
          notes=""
        >
          <MarginHeading>Google Sheet JSON Hack</MarginHeading>
          <Image height="75vh" src={images.publishToWeb} />
        </Slide>

        <Slide>
          <MarginHeading fit>https://spreadsheets.google.com/feeds/list/(DocumentID)/1/public/full?alt=json</MarginHeading>
          <Image src={images.sheetsResponse} />
        </Slide>

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="yaml"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/migration_config.example")}
          ranges={[
            { loc: [0, 4], title: "migrate_plus.migration.album2017.yml", note: "Lives in aoty_migrate/config/install" },
            { loc: [0, 6], title: "migrate_plus.migration.album2017.yml", note: "Custom source plugin - we'll look at that in a bit" },
            { loc: [0, 8], title: "migrate_plus.migration.album2017.yml", note: "Fetch http and parse json" },
            { loc: [0, 19], title: "migrate_plus.migration.album2017.yml", note: "Our big ugly google sheets json url" },
            { loc: [0, 21], title: "migrate_plus.migration.album2017.yml", note: "Traverse to feed/entry to find all items to import" },
            { loc: [20, 70], note: "Define fields and select them using Google's ugly field names" },
            { loc: [174, 180], note: "Save these as album content types" },
            { loc: [174, 197], note: "Map source fields to album node fields" },
          ]}
          notes=""
        />

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="php"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/album_source_plugin.example")}
          ranges={[
            { loc: [0, 3], title: "AlbumSourcePlugin.php", note: "Our custom source plugin - mainly exists to interact with the Spotify API during import" },
            { loc: [0, 7], title: "AlbumSourcePlugin.php", note: "Spotify Web API PHP - https://github.com/jwilsson/spotify-web-api-php" },
            { loc: [0, 22], title: "AlbumSourcePlugin.php", note: "Extend URL source plugin and implement prepareRow()" },
            { loc: [17, 34], title: "AlbumSourcePlugin.php", note: "Create an instance of Spotify Web API and get token.  Room for improvement here - could persist session, store API data in config and so on." },
            { loc: [35, 42], title: "AlbumSourcePlugin.php", note: "Search based on album column in spreadsheet to get Spotify album" },
            { loc: [35, 53], title: "AlbumSourcePlugin.php", note: "Queue up Spotify album data for Drupal. Spotify Album ID is especially useful" },
            { loc: [89, 93], title: "AlbumSourcePlugin.php", note: "Return the modified row" },
          ]}
          notes=""
        />

        <Slide
          notes=""
        >
          <MarginHeading>More Like Mi-great</MarginHeading>
          <Image src={images.migrateContent} width="75%"/>
        </Slide>

        <Slide
          notes=""
        >
          <Image src={images.drupalAlbum} width="75%" />
        </Slide>

        <Slide
          transition={['slide']}
          notes="TODO - Style quote to make side line white"
        >
          <HovCoverLayout>
            <Heading textColor="secondary" bgColor="tertiary" padding="15px">4:44 of React Basics*</Heading>
            <Text textColor="secondary">* actual time may vary</Text>
            <Layout>
              <Fill>
                <BlockQuote textColor="secondary">
                  <Quote textColor="secondary">I've been to Paris at least two times</Quote>
                  <Quote textColor="secondary">I've seen the Eiffel, I've seen a eyeful</Quote>
                  <Cite>Jay-Z - Caught Their Eyes</Cite>
                  <Text margin="15px 0 0 0" textColor="secondary" textAlign="left">Album: 4:44 (#16 of 2017)</Text>
                </BlockQuote>
              </Fill>
              <Fill>
                <Image src={albums.jayZ} height="65%" />
              </Fill>
            </Layout>
          </HovCoverLayout>
        </Slide>

        <Slide
          notes="Since it is probably a little harder to visualize, let's jump ahead and look at the React app
          before we deconstruct it.
          TODO - make sure we have an offline version of this. Maybe don't bundle entire app, just smaller components."
        >
          <MarginHeading>Spoiler Alert:</MarginHeading>
          <Link href="http://brianperryinteractive.com/aoty-visualizations/" target="_blank">
            <Image src={images.aotyApp} height="80vh" />
          </Link>
        </Slide>

        <Slide
          notes=""
        >
          <MarginHeading>Create React App</MarginHeading>
          <Terminal title="aoty-visualizations --- -bash" output={[
              "npm install -g create-react-app",
              "create-react-app my-app",
              "===== A bunch of output... =====",
              "cd my-app",
              "npm start",
              "npm run build",
              <div># DRAGONS <i class="em em-dragon"></i><i class="em em-dragon"></i><i class="em em-dragon"></i><i class="em em-dragon"></i><i class="em em-dragon"></i></div>,
              "npm run eject"
              ]}
            />
        </Slide>

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/fetch.example")}
          ranges={[
            { loc: [0, 1], title: "Loading JSON API Data with Fetch", note: "Utility function that takes an endpoint url and defines an array for albums" },
            { loc: [0, 2], title: "Loading JSON API Data with Fetch", note: "Fetch API calls the endpoint and returns a promise with the response" },
            { loc: [0, 3], title: "Loading JSON API Data with Fetch", note: "Chaining promises together - the first resolves with the json data from the response" },
            { loc: [0, 8], title: "Loading JSON API Data with Fetch", note: "The next adds album data to array and either calls getAllAlbumData recursively (if we have more pages of data)..." },
            { loc: [0, 12], title: "Loading JSON API Data with Fetch", note: "...or returns the album data (if we have it all)" },
            { loc: [0, 18], title: "Loading JSON API Data with Fetch", note: "And we log potential errors (probably should do more here...)" },
          ]}
          notes="Some ES6 Here and from this point on..."
        />

        <Slide
          notes="If you wanted to render our album component, here is what it might look like.
          In the render function we have some JSX which lets you write html like markup in Javascript.
          It also allows you to render custom JSX tags you've created, like our album here.
          It takes a number of props which are passed to the component. These could be static values, could be vraiables, and could be even be 
          functions. I can go ahead and change this to my favorite album of the year for example.
          This also shows that if the props for a compnent change, it is re-rendered
          http://lucybain.com/blog/2017/react-js-when-to-rerender/"
        >
          <MarginHeading>Album Component</MarginHeading>
          <ComponentPlayground
            theme="light"
            scope={{Album: Album}}
            code={albumCode}
          />
        </Slide>

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/component.example")}
          ranges={[
            { loc: [0, 4], title: "Defining Our Album Component", note: "Import react and extend React.Component" },
            { loc: [0, 7], title: "Defining Our Album Component", note: "Render method returns JSX" },
            { loc: [4, 27], note: "Have some logic here to return different version of component if cover image exists" },
            { loc: [7, 12], note: "Think of <AlbumRow> as another custom component - we'll take a closer look in a bit " },
            { loc: [27, 42], note: "Render the version of the album without an image" },
            { loc: [45, 55], note: "Validating our props and exporting the component" },
          ]}
          notes="Let's look a little more closely about how this album component came to be"
        />

        <Slide
          notes="React components also have the concept of state which is data managed 
          within the component.
          Control panel as an example of state.  Not sure if this should be a code slide, 
          or a simplified component playground.  Maybe simplfied component playground.
          Note about passing function into component."
        >
          <MarginHeading>Component State</MarginHeading>
          <ComponentPlayground
            theme="light"
            code={stateCode}
            style={{color: "black"}}
          />
        </Slide>

        <Slide
          notes="Passing up control panel expanded.  Passing up album data all the way to the top.
          Maybe something here about filtering functions in app? Name drop lodash?
          TODO - Maybe a code example of passing state down. Really want to add this."
        >
          <MarginHeading>Lifting State Up</MarginHeading>
          <Image src={images.state1} height="75vh" />
        </Slide>

        <Slide>
          <Image src={images.state2} />
        </Slide>

        <Slide>
          <Image src={images.state3} />
        </Slide>

        <Slide
          transition={['slide']}
          notes="TODO - Style quote to make side line white"
        >
          <CoverLayout>
            <Heading textColor="secondary" bgColor="tertiary" padding="15px">CSS in JS</Heading>
            <Layout>
              <Fill>
                <BlockQuote textColor="secondary">
                  <Quote textColor="secondary">I understood him but I was also flabbergasted</Quote>
                  <Quote textColor="secondary">I couldn't comprehend his unabashed enthusiasm</Quote>
                  <Quote textColor="secondary">It was as if he didn't know the other side of that</Quote>  
                  <Cite>Priests - No Big Bang</Cite>
                  <Text margin="15px 0 0 0" textColor="secondary" textAlign="left">Album: Nothing Feels Natural (#41 of 2017)</Text>
                </BlockQuote>
              </Fill>
              <Fill>
                <Image src={albums.priests} />
              </Fill>
            </Layout>
          </CoverLayout>
        </Slide>

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/control_panel.example")}
          ranges={[
            { loc: [0, 9], title: "How Do I Style This Stuff?", note: "You could just import a regular old CSS file" },
            { loc: [83, 97], note: "And then add classes with the className prop" },
          ]}
          notes="Let's look a little more closely about how this album component came to be"
        />

        <Slide
          notes="Why the hell would you do that, I asked."
        >
          <MarginHeading fit>But All The Cool Kids Are Writing CSS in JS</MarginHeading>
          <Appear><Image src={images.colin} height="80vh"/></Appear>
        </Slide>

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/styled.example")}
          ranges={[
            { loc: [0, 3], title: "Styled Components", note: "Import styled components library" },
            { loc: [4 , 17], title: "Styled Components", note: "Define styles inside your component, with many sass-like niceties" },
            { loc: [13, 16], note: "Adapt styles based on props." },
            { loc: [42, 47], note: "Use your styled component in JSX like any other custom component." },
          ]}
          notes="Let's look a little more closely about how this album component came to be"
        />

        <Slide
          bgColor="secondary"
          notes="Todo: Maybe follow with a code slide to show what styled components can do..."
        >
          <Image src={images.concerns} />
        </Slide>

        <Slide
          transition={['slide']}
          notes="TODO - Style quote to make side line white"
        >
          <CoverLayout>
            <Heading textColor="secondary" bgColor="tertiary" padding="15px">Building and Deploying</Heading>
            <Layout>
              <Fill>
                <BlockQuote textColor="secondary">
                  <Quote textColor="secondary">Where can, where can I go, go?</Quote>
                  <Quote textColor="secondary">It's taking, taking a hold</Quote>
                  <Quote textColor="secondary">And now I think I know</Quote> 
                  <Quote textColor="secondary">That I don't know nothing at all</Quote>  
                  <Cite>Kelela - Altadena</Cite>
                  <Text margin="15px 0 0 0" textColor="secondary" textAlign="left">Album: Take Me Apart (#7 of 2017)</Text>
                </BlockQuote>
              </Fill>
              <Fill>
                <Image src={albums.kelela} />
              </Fill>
            </Layout>
          </CoverLayout>
        </Slide>

        <Slide>
          <Heading>Our Hot JAMS(tack)</Heading>
          <BigList>
            <Appear><ListItem><S type="bold" textColor="tertiary">JavaScript</S> - React on client side</ListItem></Appear>
            <Appear><ListItem><S type="bold" textColor="tertiary">APIs</S> - Drupal - hosted anywhere that can Drupal</ListItem></Appear>
            <Appear><ListItem><S type="bold" textColor="tertiary">Markup</S> - Production bundle hosted on GitHub Pages. Not so static, more SPA.</ListItem></Appear>
          </BigList>
        </Slide>

        <Slide>
          <Heading>Static Markup</Heading>
          <Heading textColor="secondary">The secret sauce of the JAM Stack</Heading>
          <CustomText>(think static site generators like Gatsby)</CustomText>
          <Appear><CustomText>Could more of this app be static?</CustomText></Appear>
        </Slide>

        <Slide
          transition={['slide']}
          notes=""
        >
          <CoverLayout>
            <Heading textColor="secondary" bgColor="tertiary" padding="15px">Melodrama</Heading>
            <Layout>
              <Fill>
                <BlockQuote textColor="secondary">
                  <Quote textColor="secondary">Let's let things come out of the woodwork</Quote>
                  <Quote textColor="secondary">I'll give you my best side, tell you all my best lies</Quote>
                  <Quote textColor="secondary">Yeah, awesome right?</Quote>  
                  <Cite>Lorde - Homemade Dynamite</Cite>
                  <Text margin="15px 0 0 0" textColor="secondary" textAlign="left">Album: Melodrama (#3 of 2017)</Text>
                </BlockQuote>
              </Fill>
              <Fill>
                <Image src={albums.lorde} />
              </Fill>
            </Layout>
          </CoverLayout>
        </Slide>

        <Slide
          bgColor="secondary"
        >
          <Heading caps fit>Did we need Drupal</Heading>
          <Heading caps fit>For This Project?</Heading>
        </Slide>

        <Slide>
          <Heading caps fit>No.</Heading>
        </Slide>

        <Slide
          bgColor="secondary"
        >
          <Heading textColor="primary">but....</Heading>
        </Slide>

        <Slide
          bgColor="secondary"
        >
          <Heading caps fit>Yes.</Heading>
        </Slide>

        <Slide
          notes="spotify playlist with all songs referenced in slides, and then some of my other favorites from 2017
          Try to remeber sprint plug.
          And nashville."
        >
          <MarginHeading fit>Questions?</MarginHeading>
          <Heading textColor="secondary">(Thanks!)</Heading>
        </Slide>

      </Deck>
    );
  }
}
