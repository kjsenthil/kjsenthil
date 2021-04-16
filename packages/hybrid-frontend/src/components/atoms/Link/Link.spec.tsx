import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Link from './Link';

describe('Link', () => {
  const label = 'Click me';

  test('Renders an anchor when given a valid href', () => {
    const href = 'http://example.com';
    renderWithTheme(<Link href={href}>{label}</Link>);
    const anchor = screen.getByRole('link');
    expect(anchor.innerHTML).toStrictEqual(label);
  });

  test('Renders a button when given an onClick', () => {
    const clicker = jest.fn();
    renderWithTheme(<Link onClick={clicker}>{label}</Link>);
    const button = screen.getByRole('button');
    expect(button.innerHTML).toStrictEqual(label);
    screen.getByRole('button').click();
    expect(clicker).toHaveBeenCalledTimes(1);
  });
});
