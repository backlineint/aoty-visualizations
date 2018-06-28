import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

// Default Storyshots
// initStoryshots();

// To exclude stories from testing
initStoryshots({
  storyKindRegex:/^((?!.*?Demo).)*$/
});

// To instead run Image Storyshots
initStoryshots({suite: 'Image storyshots', test: imageSnapshot()});