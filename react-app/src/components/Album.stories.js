import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Album from './Album';
import { AlbumList } from './CoverView';

export const exampleAlbum = {
  activeAlbum: false,
  albumId: '4eLPsYPBmXABThSJ821sqY',
  artist: 'Kendrick Lamar',
  coverImage: 'https://i.scdn.co/image/f2e751ee3dbfec80737094585f59a76806a51797',
  selectedAlbum: '0',
  title: 'DAMN.',
  pfork_list: 1,
  npr_list: 1,
  paste_list: 2
}

// Mock functions using Storybook actions
export const albumActions = {
  selectAlbum: action('selectAlbum'),
};

storiesOf('Album', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <AlbumList>{story()}</AlbumList>)
  .add('default', () => <Album {...exampleAlbum} {...albumActions}
    artist={text('artist', 'Kendrick Lamar')}
    title={text('title', 'Damn.')}
    activeAlbum={boolean('activeAlbum', false)}
  />)
  .add('active', () => <Album {...exampleAlbum} {...albumActions} activeAlbum='true' />);