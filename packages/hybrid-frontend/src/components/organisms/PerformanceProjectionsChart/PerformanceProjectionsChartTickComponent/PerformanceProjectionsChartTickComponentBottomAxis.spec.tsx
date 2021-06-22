import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsChartTickComponentBottomAxis, {
  getAgeText,
  PerformanceProjectionsChartTickComponentBottomAxisProps,
} from './PerformanceProjectionsChartTickComponentBottomAxis';
import { useChartStyles } from '../../../../hooks';

describe('PerformanceProjectionsChartTickComponentBottomAxis', () => {
  describe('PerformanceProjectionsChartTickComponentBottomAxis component', () => {
    const todayYear = new Date().getFullYear();
    const nextYear = todayYear + 1;
    const todayAge = 30;

    // The TickComponent needs to receive chartStyles as a prop
    const ComponentWithChartStyles = (
      props: Pick<
        PerformanceProjectionsChartTickComponentBottomAxisProps,
        'displayMode' | 'formattedValue'
      >
    ) => {
      const chartStyles = useChartStyles();

      return (
        <PerformanceProjectionsChartTickComponentBottomAxis
          chartStyles={chartStyles}
          x={0}
          y={0}
          todayAge={todayAge}
          {...props}
        />
      );
    };

    test("The tick component renders correctly for display mode 'default'", () => {
      renderWithTheme(
        <svg>
          <ComponentWithChartStyles displayMode="default" formattedValue={`${todayYear}`} />
          <ComponentWithChartStyles displayMode="default" formattedValue={`${nextYear}`} />
        </svg>
      );

      expect(screen.getByText('TODAY')).toBeVisible();
      expect(screen.getByText(`AGE ${todayAge}`)).toBeVisible();

      expect(screen.getByText(`${nextYear}`)).toBeVisible();
      expect(screen.getByText(`AGE ${todayAge + 1}`)).toBeVisible();
    });

    test("The tick component renders correctly for display mode 'simplified'", () => {
      renderWithTheme(
        <svg>
          <ComponentWithChartStyles displayMode="simplified" formattedValue={`${todayYear}`} />
          <ComponentWithChartStyles displayMode="simplified" formattedValue={`${nextYear}`} />
        </svg>
      );

      expect(screen.getByText('TODAY')).toBeVisible();
      expect(screen.queryByText(`AGE ${todayAge}`)).toBeNull();

      expect(screen.queryByText(`${nextYear}`)).toBeNull();
      expect(screen.getByText(`AGE ${todayAge + 1}`)).toBeVisible();
    });
  });

  describe('getAgeText function', () => {
    const getAgeTextCases: Array<[string | undefined, number, string]> = [
      [`${new Date().getFullYear()}`, 30, 'AGE 30'],
      [`${new Date().getFullYear() + 10}`, 30, 'AGE 40'],
      [undefined, 30, 'AGE UNKNOWN'],
    ];

    test.each(getAgeTextCases)(
      "The function to calculate user's age works correctly when formattedValue is %p and today's age is %i",
      (formattedValue, todayAge, expectedAgeText) => {
        const ageText = getAgeText(formattedValue, todayAge);

        expect(ageText).toBe(expectedAgeText);
      }
    );
  });
});
