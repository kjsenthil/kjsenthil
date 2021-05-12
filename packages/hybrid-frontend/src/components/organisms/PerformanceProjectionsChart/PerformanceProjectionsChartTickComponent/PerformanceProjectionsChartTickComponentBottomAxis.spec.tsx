import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsChartTickComponentBottomAxis, {
  getAgeText,
} from './PerformanceProjectionsChartTickComponentBottomAxis';
import { usePerformanceProjectionsChartStyles } from '../performanceProjectionsChartStyles/performanceProjectionsChartStyles';

describe('PerformanceProjectionsChartTickComponentBottomAxis', () => {
  test('The tick component renders correctly', () => {
    const todayYear = new Date().getFullYear();
    const todayAge = 30;

    // The TickComponent needs to receive chartStyles as a prop
    const ComponentWithChartStyles = () => {
      const chartStyles = usePerformanceProjectionsChartStyles();

      return (
        <PerformanceProjectionsChartTickComponentBottomAxis
          chartStyles={chartStyles}
          x={0}
          y={0}
          formattedValue={`${todayYear}`}
          todayAge={todayAge}
        />
      );
    };

    renderWithTheme(
      <svg>
        <ComponentWithChartStyles />
      </svg>
    );

    expect(screen.getByText(`${todayYear}`)).toBeVisible();
    expect(screen.getByText(`Age ${todayAge}`)).toBeVisible();
  });

  const getAgeTextCases: Array<[string | undefined, number, string]> = [
    [`${new Date().getFullYear()}`, 30, 'Age 30'],
    [`${new Date().getFullYear() + 10}`, 30, 'Age 40'],
    [undefined, 30, 'Age unknown'],
  ];

  test.each(getAgeTextCases)(
    "The function to calculate user's age works correctly when formattedValue is %p and today's age is %i",
    (formattedValue, todayAge, expectedAgeText) => {
      const ageText = getAgeText(formattedValue, todayAge);

      expect(ageText).toBe(expectedAgeText);
    }
  );
});
