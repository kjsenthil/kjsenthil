import * as React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import ChartPeriodSelection from './ChartPeriodSelection';

enum PerformanceDataPeriod {
  '1M' = '1m',
  '3M' = '3m',
  '6M' = '6m',
  '1Y' = '1y',
  'ALL_TIME' = 'alltime',
}

describe('ChartPeriodSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('The period selection panel renders', () => {
    renderWithTheme(
      <ChartPeriodSelection
        performanceDataPeriod={PerformanceDataPeriod}
        currentPeriod={PerformanceDataPeriod.ALL_TIME}
        setCurrentPeriod={() => {}}
      />
    );

    const periodButtons = Object.values(PerformanceDataPeriod).map((period) =>
      screen.getByText(period)
    );

    periodButtons.forEach((periodButton) => {
      expect(periodButton).toBeVisible();
    });
  });

  const testPeriodLabels = test.each`
    period
    ${PerformanceDataPeriod['1M']}
    ${PerformanceDataPeriod['3M']}
    ${PerformanceDataPeriod['6M']}
    ${PerformanceDataPeriod['1Y']}
    ${PerformanceDataPeriod.ALL_TIME}
  `;

  testPeriodLabels(
    'The $period period button changes the period to $period when clicked',
    ({ period }) => {
      const setCurrentPeriod = jest.fn();

      renderWithTheme(
        <ChartPeriodSelection
          performanceDataPeriod={PerformanceDataPeriod}
          currentPeriod={PerformanceDataPeriod.ALL_TIME}
          setCurrentPeriod={setCurrentPeriod}
        />
      );

      const periodButton = screen.getByText(period);

      fireEvent.click(periodButton);

      expect(setCurrentPeriod).toHaveBeenCalledTimes(1);
      expect(setCurrentPeriod).toHaveBeenCalledWith(period);
    }
  );
});
