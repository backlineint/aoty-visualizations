import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import CoverView from './CoverView';

import { tenAlbums } from '../data/tenAlbums';

// Export visualization data to use with other visualizations
// Note: should really be defined and exported in app level story
export const visualizationData = {
  albums: tenAlbums,
  rows: 10,
  selectedAlbum: '0'
}

export const visualizationActions = {
  selectAlbum: action('selectAlbum'),
};

storiesOf('CoverView', module)
  .addDecorator(withKnobs)
  .add('default', () => <CoverView {...visualizationData} {...visualizationActions}
    rows={number('rows', 10)}
    selectedAlbum={text('selectedAlbum', '0')}
  />);
