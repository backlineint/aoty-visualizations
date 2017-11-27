import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';

import SearchInput from './SearchInput';

import '@blueprintjs/core/dist/blueprint.css';

storiesOf('Search Input', module)
  .addDecorator(withKnobs)
  .add('Search Input', () => {
    // If a function needs to be passed to satisfy propTypes, you should probably
    // add an action...
    return (
      <SearchInput
        placeholder={text('placeholder', 'Filter by Album or Genre')}
        filterAlbums={action('Filter Albums')}
      />
    );
  });