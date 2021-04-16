import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import HeaderMenu from './HeaderMenu';

const OLD_ENV = process.env;

describe('HeaderMenu', () => {
  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('Renders the header menu', async () => {
    renderWithTheme(<HeaderMenu />);
    expect(await screen.findByTestId('header-menu')).toBeInTheDocument();
  });

  test('Renders the correct environment', async () => {
    const testEnvironment = 'staging';
    process.env.GATSBY_ACTIVE_ENV = testEnvironment;
    renderWithTheme(<HeaderMenu />);
    expect(await screen.findByText(`[${testEnvironment}]`)).toBeInTheDocument();
  });
});
