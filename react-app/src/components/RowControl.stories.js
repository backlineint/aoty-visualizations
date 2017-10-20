import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, object } from '@storybook/addon-knobs';

import RowControl from './RowControl';

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

storiesOf('Row Control', module)
  .addDecorator(withKnobs)
  .add('Row Control', () => (
    <RowControl label={text('label', 'Number of Results:')} rowControl={object('rowControl', rowControl)} />
  ));