import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Pill from './Pill';

describe('Pill', () => {
  const testLabel = 'Pill label';

  it('renders a button with passed children', () => {
    renderWithTheme(<Pill>{testLabel}</Pill>);
    expect(screen.getByText(testLabel)).toBeInTheDocument();
  });
});
