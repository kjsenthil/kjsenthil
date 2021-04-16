import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Layout from './Layout';

describe('Layout', () => {
  test('Renders with child elements', async () => {
    renderWithTheme(
      <Layout>
        <div data-testid="some-child-element" />
      </Layout>
    );
    expect(await screen.findByTestId('some-child-element')).toBeInTheDocument();
  });
});
