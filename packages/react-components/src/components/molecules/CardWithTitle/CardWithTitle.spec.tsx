import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import { Typography } from '@material-ui/core';
import CardWithTitle, { CardWithTitleProps } from './CardWithTitle';

describe('CardWithTitle', () => {
  const defaultProps: CardWithTitleProps = {
    title: 'Title',
  };

  it('renders container', () => {
    renderWithTheme(
      <CardWithTitle {...defaultProps}>
        <Typography>Question 1</Typography>
      </CardWithTitle>
    );
    expect(screen.getByText('Title')).toBeVisible();
    expect(screen.getByText('Question 1')).toBeVisible();
  });
});
