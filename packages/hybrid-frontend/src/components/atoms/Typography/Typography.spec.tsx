import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Typogrpahy, { Variant } from './Typography';

describe('Typogrpahy', () => {
  test('Renders a button with passed children', () => {
    const testLabel = 'Some label';
    renderWithTheme(<Typogrpahy>{testLabel}</Typogrpahy>);
    expect(screen.getByText(testLabel)).toBeInTheDocument();
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
      const testLabel = 'Some label';
      renderWithTheme(<Typogrpahy variant={variant}>{testLabel}</Typogrpahy>);
      expect(document.getElementsByTagName(component)[0]).toBeInTheDocument();
    }
  );
});
