import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceChartTooltip from './PerformanceChartTooltip';
import * as dateUtil from '../../../../utils/date';

jest.mock('../../../../utils/date', () => ({
  formatDate: jest.fn(),
}));

const mockFormatDate = dateUtil.formatDate as jest.Mock;

describe('PerformanceChartTooltip', () => {
  it('The tooltip renders correctly with formatted date', () => {
    const expected = 'Jan1 , 2021';
    mockFormatDate.mockReturnValue(expected);
    renderWithTheme(<PerformanceChartTooltip date={new Date(2010, 1, 1)} />);

    expect(screen.getByText(expected, { exact: false })).toBeVisible();
  });
});
