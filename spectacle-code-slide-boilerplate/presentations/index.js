// Import React
import React from "react";
import styled, { css } from 'styled-components';

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Text,
  S
} from "spectacle";

// Import code slide
import CodeSlide from 'spectacle-code-slide';

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
//require("spectacle/lib/themes/default/index.css");


const images = {
  // stacks: require("../assets/solutions/queue-stack/stacks-on-stacks.gif")
};

// Todo - Fix image import
// TODO - Start working on spllitting sections into individual files.
// TODO - Get back to code slides.
/*const images = {
  cornMaze: require('./assets/corn_maze.png'),
};*/

preloader(images);

const theme = createTheme(
  {
    primary: '#1F2022',
    secondary: 'white',
    tertiary: '#03A9FC',
    quartenary: '#CECECE',
  },
  {
    // TODO - refine the primary font
    primary: { name: "Montserrat", googleFont: true, styles: [ "400", "700", "700b", "700i" ] },
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
              ...
            </Fill>
          </Layout>
        </Slide>

        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Queue Stack
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            Code Breakdown
          </Text>
          <Image src={images.stacks} margin="0px auto 40px" height="293px"/>
        </Slide>
        <Slide transition={["slide", "fade"]} bgColor="tertiary">
          <CodePane
            lang="js"
            source={require("raw-loader!./test.js")}
            margin="20px auto"
          />
        </Slide>
        <CodeSlide
          transition={["slide", "fade"]}
          lang="js"
          code={require("raw-loader!./test.js")}
          ranges={[
            { loc: [0, 10], title: "Queue Stack" },
            { loc: [0, 16], note: "define a stack" },
            { loc: [19, 21], note: "we have our two stacks" },
            { loc: [22, 25], note: "enqueue works the same as a normal queue"},
            { loc: [26, 36], note: "dequeue will be more involved"},
            { loc: [27, 30], note: "we need to empty inbox and push everything into outbux while doing so"},
            { loc: [30, 31], note: "popping off outbox gives first item in inbox - we save it in temp"},
            { loc: [31, 34], note: "now we have to empty the outbox and put everything back into the inbox"},
            { loc: [34, 35], note: "we return the value we saved to temp as the dequeued number"}
          ]}
        />
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>
              <em>"Fin"</em>
            </Quote>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
