import * as React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import { formatCurrency } from '../../../utils/formatters';
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
  it('matches snapshot', () => {
    expect(
      renderWithTheme(
        <GoalPotTracker
          title="Main title"
          potTotal={100}
          progressBarProps={{ currencyFormatter: formatCurrency, progressBarData }}
        />
      )
    ).toMatchSnapshot();
  });
});
