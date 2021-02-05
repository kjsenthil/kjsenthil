import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderMenu from './HeaderMenu';

describe('HeaderMenu', () => {
  test('Renders the header menu', async () => {
    render(<HeaderMenu />);
    expect(await screen.findByTestId('header-menu')).toBeInTheDocument();
  });
});
