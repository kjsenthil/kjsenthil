import * as React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import { formatCurrency } from '../../../utils/formatters';
import ProgressBarWithLegend from './ProgressBarWithLegend';

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

const props = {
  currencyFormatter: formatCurrency,
  progressBarData,
};

describe('PrgoressBarWithLegend', () => {
  it('matches snapshot', () => {
    expect(renderWithTheme(<ProgressBarWithLegend {...props} />)).toMatchSnapshot();
  });
});
