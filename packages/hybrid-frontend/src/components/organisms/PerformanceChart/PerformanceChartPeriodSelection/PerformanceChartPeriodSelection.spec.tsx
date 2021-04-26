import * as React from 'react';
import { renderWithTheme, screen, fireEvent } from '@tsw/test-util';
import PerformanceChartPeriodSelection, {
  periodButtonLabel,
} from './PerformanceChartPeriodSelection';
import { PerformanceChartPeriod } from '../data/utils';
import * as dataContext from '../data/dataContext';
import { changePerformanceDataPeriod } from '../data/dataContext';

describe('PerformanceChartPeriodSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('The period selection panel renders', () => {
    renderWithTheme(
      <dataContext.PerformanceDataContextProvider>
        <PerformanceChartPeriodSelection />
      </dataContext.PerformanceDataContextProvider>
    );

    const periodButtons = Object.values(PerformanceChartPeriod).map((period) =>
      screen.getByText(periodButtonLabel[period])
    );

    periodButtons.forEach((periodButton) => {
      expect(periodButton).toBeVisible();
    });
  });

  const testPeriodLabels = test.each`
    period
    ${PerformanceChartPeriod['1M']}
    ${PerformanceChartPeriod['3M']}
    ${PerformanceChartPeriod['6M']}
    ${PerformanceChartPeriod['1Y']}
    ${PerformanceChartPeriod.ALL_TIME}
  `;

  testPeriodLabels(
    'The $period period button changes the period to $period when clicked',
    ({ period }) => {
      const mockDispatch = jest.fn();

      const useContextSpy = jest
        .spyOn(dataContext, 'usePerformanceDataContext')
        .mockImplementation(() => ({
          state: { dataPeriod: period, dataStore: {}, dataStoreId: 0 },
          dispatch: mockDispatch,
        }));

      renderWithTheme(
        <dataContext.PerformanceDataContextProvider>
          <PerformanceChartPeriodSelection />
        </dataContext.PerformanceDataContextProvider>
      );

      const periodButton = screen.getByText(periodButtonLabel[period]);

      fireEvent.click(periodButton);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(changePerformanceDataPeriod(period));

      useContextSpy.mockRestore();
    }
  );
});
