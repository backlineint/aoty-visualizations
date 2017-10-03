import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Gear from './Gear';

import '@blueprintjs/core/dist/blueprint.css';

storiesOf('Gear', module)
  .add('Gear', () => (
    <Gear />
  ));