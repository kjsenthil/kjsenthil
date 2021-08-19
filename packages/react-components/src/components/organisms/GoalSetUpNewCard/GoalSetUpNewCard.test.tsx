import * as React from 'react';
import { screen, renderWithTheme } from '@tsw/test-util';
import GoalSetUpNewCard from './GoalSetUpNewCard';

describe('GoalSetUpNewCard', () => {
  it('renders correctly', () => {
    renderWithTheme(<GoalSetUpNewCard imgProps={{ src: '', alt: 'some alt text' }} />);

    expect(screen.getByAltText('some alt text')).toBeInTheDocument();
    expect(screen.getByText("Save for what's important to you")).toBeVisible();
    expect(screen.getByText('Set up a new goal')).toBeVisible();
  });
});
