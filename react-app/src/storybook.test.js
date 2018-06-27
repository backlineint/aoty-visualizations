import initStoryshots from '@storybook/addon-storyshots';

//initStoryshots();

// Skip demo storyshots
initStoryshots({
  storyKindRegex:/^((?!.*?Demo).)*$/
});