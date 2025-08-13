/** @type { import('@storybook/react-vite').Preview } */
import '../src/index.css';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default preview;
