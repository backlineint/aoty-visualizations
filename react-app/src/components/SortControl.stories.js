import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, object } from '@storybook/addon-knobs';

import SortControl from './SortControl';

import '@blueprintjs/core/dist/blueprint.css';

const sortControl = {
  options: {
    title: {field: 'title', label: 'Album', defaultSort: 'asc'},
    field_genre: {field: 'field_genre', label: 'Genre', defaultSort: 'asc'},
    field_avg: {field: 'field_avg', label: 'Average', defaultSort: 'asc'},
    field_cons_score: {field: 'field_cons_score', label: 'Consensus Score', defaultSort: 'asc'},
    field_id: {field: 'field_id', label: 'ID', defaultSort: 'asc'},
    field_lists: {field: 'field_lists', label: 'Lists', defaultSort: 'desc'},
    field_top_10s: {field: 'field_top_10s', label: 'Top Ten', defaultSort: 'desc'},
    field_wt_avg: {field: 'field_wt_avg', label: 'Weighted Average', defaultSort: 'asc'}
  }
};

storiesOf('Sort Control', module)
  .addDecorator(withKnobs)
  .add('Sort Control', () => {
    return (
      <SortControl
        label={text('label', 'Sort By:')}
        sortControl={object('sortControl', sortControl)}
        defaultValue={text('defaultValue', 'field_cons_score')}
        sortAlbums={action('Sort Albums')}
      />
    );
  });