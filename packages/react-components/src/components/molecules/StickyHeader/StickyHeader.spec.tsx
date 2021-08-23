import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import StickyHeader from './StickyHeader';
import { Typography } from '../../atoms';

describe('StickyHeader', () => {
  beforeEach(() => {
    renderWithTheme(
      <StickyHeader stickyEnabled>
        <Typography>Test Content</Typography>
      </StickyHeader>
    );
  });

  it('renders a StickyHeader', () => {
    const contentText = screen.getByText('Test Content');

    expect(contentText).toBeVisible();
  });
});
