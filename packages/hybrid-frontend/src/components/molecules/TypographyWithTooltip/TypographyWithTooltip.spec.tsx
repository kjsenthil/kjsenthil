import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import TypographyWithTooltip from './TypographyWithTooltip';

describe('TypographyWithTooltip', () => {
  it('renders percentage tag with formatter', () => {
    renderWithTheme(<TypographyWithTooltip tooltip="some text">lorem ipsum</TypographyWithTooltip>);

    expect(screen.getByText('lorem ipsum')).toBeInTheDocument();
    expect(screen.getByLabelText('more information')).toBeInTheDocument();
    expect(screen.getByTitle('some text')).toBeInTheDocument();
  });
});
