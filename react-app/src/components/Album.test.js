import React from 'react';
import ReactDOM from 'react-dom';
import Album from './Album';

import { exampleAlbum } from './Album.stories';

it('Renders as expected', () => {
  const div = document.createElement('div');
  const events = { selectAlbum: jest.fn() };
  ReactDOM.render(<Album {...exampleAlbum} {...events} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
