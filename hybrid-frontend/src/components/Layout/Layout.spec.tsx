import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  test('Renders with child elements', async () => {
    render(<Layout><div data-testid="some-child-element"></div></Layout>);
    expect(await screen.findByTestId('some-child-element')).toBeInTheDocument();
  });
});
