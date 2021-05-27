import * as React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import PerformanceChartPeriodSelection, {
  periodButtonLabel,
} from './PerformanceChartPeriodSelection';
import { PerformanceDataPeriod } from '../../../../services/performance/constants';

describe('PerformanceChartPeriodSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('The period selection panel renders', () => {
    renderWithTheme(
      <PerformanceChartPeriodSelection
        currentPeriod={PerformanceDataPeriod.ALL_TIME}
        setCurrentPeriod={() => {}}
      />
    );

    const periodButtons = Object.values(PerformanceDataPeriod).map((period) =>
      screen.getByText(periodButtonLabel[period])
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
        <PerformanceChartPeriodSelection
          currentPeriod={PerformanceDataPeriod.ALL_TIME}
          setCurrentPeriod={setCurrentPeriod}
        />
      );

      const periodButton = screen.getByText(periodButtonLabel[period]);

      fireEvent.click(periodButton);

      expect(setCurrentPeriod).toHaveBeenCalledTimes(1);
      expect(setCurrentPeriod).toHaveBeenCalledWith(period);
    }
  );
});
