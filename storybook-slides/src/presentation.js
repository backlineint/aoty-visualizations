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
  ComponentPlayground,
  Code
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
  cornMaze: require('./assets/corn_maze.jpg'),
  clientList: require('./assets/client_list.png'),
  hs2: require('./assets/hs2.png'),
  atomicDesign: require('./assets/atomic-design.png'),
  react: require('./assets/react.jpg'),
  storybookLogo: require('./assets/storybook.svg'),
  artsy: require('./assets/artsy.png'),
  uber: require('./assets/uber.png'),
  albumStory: require('./assets/album-story.png'),
  aotyApp: require('./assets/aoty_app.png'),
  storyshotConsole: require('./assets/storyshots.png'),
  snap: require('./assets/snap.png'),
  visual: require('./assets/visual.png'),
  guideGuide: require('./assets/guideguide.png'),
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
  code {
    display: inline-block;
    font-size: 4rem !important;
    margin-bottom: 4rem;
    margin-left: 4rem;
    color: white;
    background-color: #03A9FC;
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
              <CustomText>&nbsp;</CustomText>
              <CustomText>d.o: brianperry</CustomText>
              <CustomText>twitter: bricomedy</CustomText>
              <CustomText>github: backlineint</CustomText>
              <CustomText>nintendo: wabrian</CustomText>
              <CustomText>brianperryinteractive.com</CustomText>
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
          bgImage={images.atomicDesign}
          notes="So many of us have embraced the atomic design approach. Many folks in the
          Drupal community use Pattern Lab to develop a pattern library for their projects.
          Who here uses Pattern Lab?"
        >
        </Slide>

        <Slide
          transition={['slide']}
          bgImage={images.react}
          notes="In JS Framework-vile I'm hearing React, React, React. Some people
          are shouting Vue too, but man, so much React"
        >
          <Heading size={1} caps fit textColor="secondary">
            Component
          </Heading>
          <Heading size={1} caps fit textColor="secondary">
            Based JS
          </Heading>
          <Heading size={1} caps fit textColor="secondary">
            Frameworks
          </Heading>
        </Slide>

        <Slide>
          <Image src={images.storybookLogo} width="75%"/>
          <BigList>
            <ListItem>Interactive development environment for your UI components</ListItem>
            <ListItem>Suport for React, Vue and Angular</ListItem>
            <ListItem>Extensive set of addons</ListItem>
            <ListItem>Facilitates UI testing</ListItem>
          </BigList>
        </Slide>

        <Slide>
          <MarginHeading>Example: Artsy</MarginHeading>
          <Link href="https://github.com/artsy" target="_blank">
            <Image src={images.artsy} height="80vh" />
          </Link>
        </Slide>

        <Slide>
          <MarginHeading>Example: Uber React-Vis</MarginHeading>
          <Link href="https://uber.github.io/react-vis/website/dist/storybook/index.html" target="_blank">
            <Image src={images.uber} height="80vh" />
          </Link>
        </Slide>

        <Slide
          notes=""
        >
          <MarginHeading>Adding Storybook to a Project</MarginHeading>
          <Terminal title="storybook-demo --- -bash" output={[
            "npx create-react-app my-app",
            "cd my-app",
            "npx -p @storybook/cli getstorybook",
            "npm run storybook",
            "Storybook started on => http://localhost:6006/"
          ]}
          />
        </Slide>

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/config.example")}
          ranges={[
            { loc: [0, 10], title: ".storybook/config.js", note: "Update storybook config to load all *.stories.js files in component directories." },
          ]}
          notes=""
        />

        <Slide>
          <MarginHeading>Example Story: Album</MarginHeading>
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
          code={require("raw-loader!./assets/code/story.example")}
          ranges={[
            { loc: [0, 2], title: "src/components/Album.stories.js", note: "Import React and storiesOf from Storybook" },
            { loc: [0 , 5], title: "src/components/Album.stories.js", note: "Import the components that this story depends on." },
            { loc: [6, 14], title: "src/components/Album.stories.js", note: "Mock data to use for the test and export it so other components can use it." },
            { loc: [15, 20], title: "src/components/Album.stories.js", note: "Define a story for your component, and add any variants." },
          ]}
          notes=""
        />

        <Slide
          notes="Show action logging here"
        >
          <MarginHeading>Our Album Story</MarginHeading>
          <Link href="http://localhost:6006" target="_blank">
            <Image src={images.albumStory} height="80vh" />
          </Link>
        </Slide>

        <Slide
        >
          <MarginHeading>Addons</MarginHeading>
          <BigList>
            <ListItem textColor="primary">Install the addon dependency:</ListItem>
            <Code>npm i -D @storybook/addon-actions</Code>
            <ListItem>Register the addon in .storybook/addons.js:</ListItem>
            <Code>import '@storybook/addon-actions/register';</Code>
          </BigList>
        </Slide>

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/actions.example")}
          ranges={[
            { loc: [0, 3], title: "Addon: Actions", note: "Import actions addon" },
            { loc: [16 , 20], title: "Addon: Actions", note: "Mock your function using actions." },
            { loc: [21, 25], title: "Addon: Actions", note: "Could explictly call action in a prop, or use object spread." }
          ]}
          notes=""
        />

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/knobs.example")}
          ranges={[
            { loc: [0, 4], title: "Addon: Knobs", note: "Import Knobs addon" },
            { loc: [21, 24], title: "Addon: Knobs", note: "Add a decorator for Knobs (can also add globally)" },
            { loc: [21, 30], title: "Addon: Knobs", note: "Use the appropriate knob (text, boolean, etc) in place of prop - specify label and value" },
          ]}
          notes=""
        />

        <Slide
          notes="Lets take a deeper look at the app so we can tackle a composite component."
        >
          <MarginHeading>Album of the Year App</MarginHeading>
          <Link href="http://brianperryinteractive.com/aoty-visualizations/" target="_blank">
            <Image src={images.aotyApp} height="80vh" />
          </Link>
        </Slide>

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/composite.example")}
          ranges={[
            { loc: [0, 6], title: "Composite Story: Cover View", note: "Similar biolerplate for imports" },
            { loc: [7, 8], title: "Composite Story: Cover View", note: "Mocking data can be the hard part. Having a re-usable album data set helps here" },
            { loc: [9, 20], title: "Composite Story: Cover View", note: "Export data that can be re-used for other visualization types" },
            { loc: [21, 23], title: "Composite Story: Cover View", note: "Create your story" },
            { loc: [21, 24], title: "Composite Story: Cover View", note: "Spread data and actions as props" },
            { loc: [21, 27], title: "Composite Story: Cover View", note: "Override with knobs" },
          ]}
          notes=""
        />

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/list.example")}
          ranges={[
            { loc: [0, 8], title: "List View", note: "Re-use data from cover view" },
            { loc: [10, 24], title: "List View", note: "All that remains is to write stories" },
          ]}
          notes=""
        />

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/table.example")}
          ranges={[
            { loc: [0, 17], title: "Album Table", note: "Mostly just boilerplate at this point" }
          ]}
          notes=""
        />

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/app.example")}
          ranges={[
            { loc: [0, 7], title: "App.stories.js", note: "Can even go as far as a story for entire app. Works well for live decoupled app." }
          ]}
          notes=""
        />

        <Slide>
          <MarginHeading>Testing</MarginHeading>
          <BigList>
            <ListItem>Storyshots - Jest Snapshot Testing</ListItem>
            <Code>npm i -D @storybook/addon-storyshots</Code>
            <ListItem>Storyshots Puppeteer - Visualregression Testing</ListItem>
            <Code>npm i -D @storybook/addon-storyshots-puppeteer</Code>
            <ListItem>Tip: story data can also inform Jest unit tests</ListItem>
            <ListItem>Also try: storybook-addon-specifications</ListItem>
          </BigList>
        </Slide>

        <CodeSlide
          className="code-slide"
          bgColor="secondary"
          lang="js"
          // eslint-disable-next-line import/no-webpack-loader-syntax
          code={require("raw-loader!./assets/code/test.example")}
          ranges={[
            { loc: [0, 5], title: "src/storybook.test.js", note: "Default storyshots config" },
            { loc: [6, 10], title: "src/storybook.test.js", note: "Excluding specific stories" },
            { loc: [11, 20], title: "src/storybook.test.js", note: "Image snapshots" },
          ]}
          notes=""
        />

        <Slide
          notes=""
        >
          <MarginHeading>Storyshot Output</MarginHeading>
          <Image src={images.storyshotConsole} height="80vh" />
        </Slide>

        <Slide
          notes=""
        >
          <MarginHeading>Storyshot Output</MarginHeading>
          <Image src={images.snap} height="80vh" />
        </Slide>

        <Slide
          notes=""
        >
          <MarginHeading>Storyshot Puppeteer Output</MarginHeading>
          <Image src={images.visual} />
        </Slide>

        <Slide>
          <MarginHeading>Deploying Your Storybook</MarginHeading>
          <BigList>
            <Code>build-storybook -c .storybook -o .out</Code>
            <ListItem>Run manually, or add as NPM script</ListItem>
            <ListItem>Creates static bundle in .out directory</ListItem>
          </BigList>
        </Slide>

        <Slide
          notes=""
        >
          <MarginHeading>What About Drupal / Pattern Lab?</MarginHeading>
          <Image src={images.guideGuide} height="80vh" />
        </Slide>

        <Slide
          bgColor="secondary"
        >
          <MarginHeading textColor="tertiary" fit>Questions?</MarginHeading>
          <Heading textColor="primary">(Thanks!)</Heading>
        </Slide>

      </Deck>
    );
  }
}
