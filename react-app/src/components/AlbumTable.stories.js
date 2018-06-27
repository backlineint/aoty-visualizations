import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number } from '@storybook/addon-knobs';

import AlbumTable from './AlbumTable';

import { visualizationData } from './CoverView.stories';

storiesOf('AlbumTableDemo', module)
  .addDecorator(withKnobs)
  .add('default', () => <AlbumTable {...visualizationData}
    rows={number('rows', 10)}
  />);
