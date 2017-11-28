import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, object } from '@storybook/addon-knobs';

import ControlPanel from './ControlPanel';

import '@blueprintjs/core/dist/blueprint.css';

const rowControl = {
  5: {
    rows: 5,
    active: false,
    disabled: false
  },
  10: {
    rows: 10,
    active: false,
    disabled: false
  },
  25: {
    rows: 25,
    active: false,
    disabled: false
  },
  50: {
    rows: 50,
    active: true,
    disabled: false
  }
};

storiesOf('Control Panel', module)
  .addDecorator(withKnobs)
  .add('Control Panel', () => {
    return (
      <ControlPanel
        header={text('header', 'Best of Best of 2016')}
        defaultSort={text('defaultSort', 'field_cons_score')}
        filterAlbums={action('Filter Albums')}
        sortAlbums={action('Sort Albums')}
        rowControl={object('rowControl', rowControl)}
        handleRowChange={action('Handle Row Change')}
        setRows={action('Set Rows')}
      />
    );
  });