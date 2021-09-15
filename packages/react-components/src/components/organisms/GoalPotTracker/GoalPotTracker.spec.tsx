import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import GoalPotTracker from './GoalPotTracker';

const progressBarData = [
  {
    legendProps: { title: 'Title A', value: 10 },
    progress: 0.1,
  },
  {
    legendProps: { title: 'Title B', value: 30 },
    progress: 0.3,
  },
  {
    legendProps: { title: 'Title C', value: 70 },
    progress: 0.7,
  },
];

describe('GoalPotTracker', () => {
  beforeEach(() => {
    renderWithTheme(
      <GoalPotTracker title="Main title" potTotal={100} progressBarProps={{ progressBarData }} />
    );
  });

  it('renders title', () => {
    const title = screen.getByText('Main title:');

    expect(title).toBeInTheDocument();
  });

  it('renders progress bar data', () => {
    const legendTitle1 = screen.getByText('TITLE A');
    const legendTitle2 = screen.getByText('TITLE B');
    const legendTitle3 = screen.getByText('TITLE C');

    const legendValue1 = screen.getByText('£10');
    const legendValue2 = screen.getByText('£30');
    const legendValue3 = screen.getByText('£70');

    expect(legendTitle1).toBeInTheDocument();
    expect(legendTitle2).toBeInTheDocument();
    expect(legendTitle3).toBeInTheDocument();
    expect(legendValue1).toBeInTheDocument();
    expect(legendValue2).toBeInTheDocument();
    expect(legendValue3).toBeInTheDocument();
  });
});
