import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, object } from '@storybook/addon-knobs';

import RowControl from './RowControl';

// Is there some way to just get import rowControl as defined in app.js? I suppose
// I could export/import from a config or variables file.
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

const rowControlDisabled = {
  5: {
    rows: 5,
    active: true,
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
    disabled: true
  },
  50: {
    rows: 50,
    active: false,
    disabled: true
  }
};

storiesOf('Row Control', module)
  .addDecorator(withKnobs)
  .add('Row Control', () => {
    // If we wanted to mock a function passed via props we could do it here
    // Don't know how to use it to update state/knobs though...
    /*const handleRowChange = (numRows) => {
      rowControl[numRows].active = true;
      console.log(rowControl);
    };*/
    return (
      <RowControl
        label={text('label', 'Number of Results:')}
        rowControl={object('rowControl', rowControl)}
        setRows={action('Set Rows')}
      />
    );
  })
  .add('Row Control Disabled', () => {
    return (
      <RowControl
        label={text('label', 'Number of Results:')}
        rowControl={object('rowControl', rowControlDisabled)}
        setRows={action('Set Rows')}
      />
    );
  });