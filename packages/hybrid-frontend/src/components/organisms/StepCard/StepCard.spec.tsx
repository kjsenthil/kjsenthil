import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import StepCard from './StepCard';
import { Typography } from '../../atoms';

describe('StepCard', () => {
  beforeEach(() => {
    renderWithTheme(
      <StepCard title="Title Text" step={1}>
        <Typography>Test Content</Typography>
      </StepCard>
    );
  });

  it('renders a StepCard', () => {
    const titleText = screen.getByText('Title Text');
    const contentText = screen.getByText('Test Content');

    expect(titleText).toBeVisible();
    expect(contentText).toBeVisible();
  });
});
