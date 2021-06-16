import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import MainCard from './MainCard';
import { Button, Typography } from '../../atoms';

describe('MainCard', () => {
  it('renders a MainCard', () => {
    renderWithTheme(
      <MainCard title="Title Text" renderActionEl={() => <Button>Test Button</Button>}>
        <Typography>Test Content</Typography>
      </MainCard>
    );

    const titleText = screen.getByText('Title Text');
    const buttonText = screen.getByText('Test Button');
    const contentText = screen.getByText('Test Content');

    expect(titleText).toBeVisible();
    expect(buttonText).toBeVisible();
    expect(contentText).toBeVisible();
  });

  it('does not render the card content when loading', () => {
    renderWithTheme(
      <MainCard isLoading title="Title Text" renderActionEl={() => <Button>Test Button</Button>}>
        <Typography>Test Content</Typography>
      </MainCard>
    );

    expect(screen.queryByText('Test Button')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
});
