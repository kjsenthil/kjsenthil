import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import TagBox from './TagBox';

describe('TagBox', () => {
  const formattedValue = '10.00%';
  it('renders percentage tag with formatter', () => {
    renderWithTheme(
      <TagBox variant="percentage" formatter={() => formattedValue}>
        {10.0}
      </TagBox>
    );
    expect(screen.getByText(formattedValue)).toBeInTheDocument();
  });

  it('renders label tag', () => {
    renderWithTheme(<TagBox variant="label">Fund</TagBox>);
    expect(screen.getByText('Fund')).toBeInTheDocument();
  });

  it('renders badge tag', () => {
    renderWithTheme(<TagBox variant="badge">Archive</TagBox>);
    expect(screen.getByText('Archive')).toBeInTheDocument();
  });
});
