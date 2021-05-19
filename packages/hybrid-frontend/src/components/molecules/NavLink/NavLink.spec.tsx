import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import NavLink from '.';

describe('NavLink', () => {
  beforeEach(() => {
    renderWithTheme(<NavLink to="/">Test Link</NavLink>);
  });

  it('renders a MainCard', () => {
    const buttonText = screen.getByText('Test Link');

    expect(buttonText).toBeVisible();
  });
});
