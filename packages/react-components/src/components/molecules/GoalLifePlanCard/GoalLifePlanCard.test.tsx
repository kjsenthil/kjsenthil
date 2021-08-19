import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import GoalLifePlanCard from './GoalLifePlanCard';

describe('GoalLifePlanCard', () => {
  it('renders correctly', () => {
    renderWithTheme(<GoalLifePlanCard>Some text</GoalLifePlanCard>);

    expect(screen.getByText('Some text')).toBeVisible();
  });
});
