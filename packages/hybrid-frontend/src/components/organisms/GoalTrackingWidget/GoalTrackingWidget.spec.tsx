import * as React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import GoalTrackingWidget from './GoalTrackingWidget';

const progressBarData = [
  {
    progress: 0.2,
    legendProps: { title: 'Lump Sum', value: 20000 },
  },
  {
    progress: 0.5,
    legendProps: { title: 'From Age 67 - 89', value: 1080000 },
  },
  {
    progress: 0.05,
    legendProps: { title: 'Remaining', value: 72000 },
  },
];

const opts = { minimumFractionDigits: 0 };
const onTrack = formatPercent(0.72, { opts });
const shortfall = 55000;
const totalProjected = progressBarData.reduce((acc, data) => acc + data.legendProps.value, 0);
const target = totalProjected + shortfall;

const props = {
  target,
  onTrack,
  currencyFormatter: formatCurrency,
  progressBarData,
  totalProjected,
  drawdownMonthlyIncome: 2340,
  drawdownStartAge: 67,
  drawdownEndAge: 89,
};

describe('GoalTrackingCardContent', () => {
  it(' matches snapshot', () => {
    expect(renderWithTheme(<GoalTrackingWidget {...props} />)).toMatchSnapshot();
  });
});
