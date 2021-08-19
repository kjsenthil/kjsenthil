import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import SubHeader from './SubHeader';
import { Typography } from '../../atoms';

describe('SubHeader', () => {
  beforeEach(() => {
    renderWithTheme(
      <SubHeader>
        <Typography>Test Content</Typography>
      </SubHeader>
    );
  });

  it('renders a SubHeader', () => {
    const contentText = screen.getByText('Test Content');

    expect(contentText).toBeVisible();
  });
});
