import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Typogrpahy, { Variant } from './Typography';

describe('Typogrpahy', () => {
  const text = 'Some label';
  test('Renders the passed text', () => {
    renderWithTheme(<Typogrpahy>{text}</Typogrpahy>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it.each`
    variant  | component
    ${'h1'}  | ${'h1'}
    ${'h2'}  | ${'h2'}
    ${'h3'}  | ${'h3'}
    ${'h4'}  | ${'h4'}
    ${'h5'}  | ${'h5'}
    ${'sh1'} | ${'h6'}
    ${'sh2'} | ${'h6'}
    ${'sh3'} | ${'h6'}
    ${'sh4'} | ${'h6'}
    ${'b1'}  | ${'p'}
    ${'b2'}  | ${'p'}
    ${'b3'}  | ${'p'}
  `(
    'maps variant $variant to component $component',
    ({ variant, component }: { variant: Variant; component: string }) => {
      renderWithTheme(<Typogrpahy variant={variant}>{text}</Typogrpahy>);
      expect(document.getElementsByTagName(component)[0]).toBeInTheDocument();
    }
  );
});
