import * as React from 'react';
import { renderHook, ResultContainer } from '@testing-library/react-hooks';
import { configureStore, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import useGoalPotTrackerProgressBarData, {
  GoalPotTrackerProgressBarProps,
  GoalPotTrackerProgressBarReturn,
  getProjectionsData,
} from './useGoalPotTrackerProgressBarData';

const getRenderedHook = (store: Store, props: GoalPotTrackerProgressBarProps) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return renderHook(() => useGoalPotTrackerProgressBarData(props), { wrapper });
};

const props = {
  doesGoalExist: false,
  goalPotTotal: 1000000,
  drawdownStartAge: 67,
  drawdownEndAge: 89,
  lumpSum: 100000,
  laterLifeLeftOver: 120000,
};

const untouchedAmount = props.goalPotTotal - props.lumpSum - props.laterLifeLeftOver;
const laterLifeLeftOverPercentage = props.laterLifeLeftOver / props.goalPotTotal;

const defaultResult = {
  goalPotTrackerProgressBarData: [
    {
      legendProps: {
        title: `Lump sum`,
        value: props.lumpSum,
      },
      progress: props.lumpSum / props.goalPotTotal,
    },
    {
      legendProps: {
        title: `From age ${props.drawdownStartAge} to ${props.drawdownEndAge}`,
        value: untouchedAmount,
      },
      progress: untouchedAmount / props.goalPotTotal,
    },
    {
      legendProps: {
        title: `Remaining amount`,
        value: props.laterLifeLeftOver,
      },
      progress: laterLifeLeftOverPercentage,
    },
  ],
  target: props.goalPotTotal,
  onTrack: 0,
  surplusOrShortfall: 0,
  totalProjected: props.goalPotTotal,
  drawdownMonthlyIncome: 0,
};

const data = {
  desiredOutflow: 1000000,
  onTrackPercentage: 60,
  affordableLumpSum: 10000,
  affordableOutflow: 100000,
  affordableDrawdown: 1000,
  surplusOrShortfall: 2000,
  totalAffordableDrawdown: 100000,
  affordableRemainingAmount: 20000,
};

const desiredOutflowResults = {
  goalPotTrackerProgressBarData: [
    {
      legendProps: {
        title: `Lump sum`,
        value: data.affordableLumpSum,
      },
      progress: data.affordableLumpSum / data.desiredOutflow,
    },
    {
      legendProps: {
        title: `From age ${props.drawdownStartAge} to ${props.drawdownEndAge}`,
        value: data.totalAffordableDrawdown,
      },
      progress: data.totalAffordableDrawdown / data.desiredOutflow,
    },
    {
      legendProps: {
        title: `Remaining amount`,
        value: data.affordableRemainingAmount,
      },
      progress: data.affordableRemainingAmount / data.desiredOutflow,
    },
  ],
  target: data.desiredOutflow,
  onTrack: data.onTrackPercentage,
  surplusOrShortfall: data.surplusOrShortfall,
  totalProjected: data.affordableOutflow,
  drawdownMonthlyIncome: data.affordableDrawdown,
};

const affordableOutflowResults = {
  ...desiredOutflowResults,
  goalPotTrackerProgressBarData: [
    {
      legendProps: {
        title: `Lump sum`,
        value: data.affordableLumpSum,
      },
      progress: data.affordableLumpSum / data.affordableOutflow,
    },
    {
      legendProps: {
        title: `From age ${props.drawdownStartAge} to ${props.drawdownEndAge}`,
        value: data.totalAffordableDrawdown,
      },
      progress: data.totalAffordableDrawdown / data.affordableOutflow,
    },
    {
      legendProps: {
        title: `Remaining amount`,
        value: data.affordableRemainingAmount,
      },
      progress: data.affordableRemainingAmount / data.affordableOutflow,
    },
  ],
};

const defaultProjectionDataResult = {
  affordableDrawdown: undefined,
  affordableLumpSum: undefined,
  affordableRemainingAmount: undefined,
  affordableTotalDrawdown: undefined,
  affordableUnDiscountedOutflowAverage: undefined,
  desiredDiscountedOutflow: undefined,
  onTrackPercentage: undefined,
  shortfallSurplusAverage: undefined,
};

const buildStore = (onTrackPercentage: number) =>
  configureStore({
    reducer: {
      goalSimulateProjections: () => ({
        data: {
          goal: {
            desiredDiscountedOutflow: data.desiredOutflow,
            onTrack: {
              percentage: onTrackPercentage,
            },
            affordableUnDiscountedOutflowAverage: data.affordableOutflow,
            shortfallSurplusAverage: data.surplusOrShortfall,
            drawdownRetirement: {
              affordable: {
                lumpSum: data.affordableLumpSum,
                drawdown: data.affordableDrawdown,
                totalDrawdown: data.totalAffordableDrawdown,
                remainingAmount: data.affordableRemainingAmount,
              },
            },
          },
        },
      }),
    },
  });

describe('useGoalPotTrackerProgressBarData', () => {
  let renderedHook: ResultContainer<GoalPotTrackerProgressBarReturn>;

  describe('when no goalSimulateProjections is not present', () => {
    const store = configureStore({
      reducer: {
        goalSimulateProjections: () => ({
          data: undefined,
        }),
      },
    });

    it('returns default results from props', () => {
      renderedHook = getRenderedHook(store, props);

      expect(renderedHook.result.current).toStrictEqual(defaultResult);
    });

    it('returns default results from props even if doesGoalExist = true', () => {
      renderedHook = getRenderedHook(store, { ...props, doesGoalExist: true });

      expect(renderedHook.result.current).toStrictEqual(defaultResult);
    });
  });

  describe('when goalSimulateProjections is present', () => {
    const store = buildStore(data.onTrackPercentage);

    it('returns default results from props if doesGoalExist is false', () => {
      renderedHook = getRenderedHook(store, { ...props, doesGoalExist: false });
      expect(renderedHook.result.current).toStrictEqual(defaultResult);
    });

    describe('when onTrackPercentage is less than or equal to 100', () => {
      it('returns results from store if doesGoalExist is true calculating percentrage using desiredOutflow', () => {
        renderedHook = getRenderedHook(store, { ...props, doesGoalExist: true });
        expect(renderedHook.result.current).toStrictEqual(desiredOutflowResults);
      });

      it('returns results from store if doesGoalExist is true calculating percentrage using desiredOutflow', () => {
        data.onTrackPercentage = 100;
        const maxPercentageStore = buildStore(data.onTrackPercentage);
        renderedHook = getRenderedHook(maxPercentageStore, { ...props, doesGoalExist: true });
        expect(renderedHook.result.current).toStrictEqual({
          ...desiredOutflowResults,
          onTrack: data.onTrackPercentage,
        });
      });
    });

    describe('when onTrackPercentage is more than 100', () => {
      it('returns results from store if doesGoalExist is true calculating percentrage using affordableOutflow', () => {
        data.onTrackPercentage = 110;
        const moreThan100OnTrackPercentageStore = buildStore(data.onTrackPercentage);
        renderedHook = getRenderedHook(moreThan100OnTrackPercentageStore, {
          ...props,
          doesGoalExist: true,
        });
        expect(renderedHook.result.current).toStrictEqual({
          ...affordableOutflowResults,
          onTrack: data.onTrackPercentage,
        });
      });
    });
  });

  describe('when getProjectionsData is called', () => {
    it('returns default values if doesGoalExist is false and data exists', () => {
      const response = getProjectionsData(false, {
        contributionData: [],
        projectionData: [],
        goal: {
          affordableUnDiscountedOutflowAverage: 5,
          affordableUndiscountedOutflowUnderperform: 5,
          desiredDiscountedOutflow: 5,
          shortfallSurplusAverage: 5,
          shortfallSurplusUnderperform: 5,
          onTrack: {
            percentage: 20,
            monthlyContributionsToReach: 500,
            targetProjectionData: [],
            upfrontContributionsToReach: 1000,
          },
        },
      });
      expect(response).toStrictEqual(defaultProjectionDataResult);
    });

    it('returns default values if doesGoalExist is true and data does not exists', () => {
      const response = getProjectionsData(true, undefined);
      expect(response).toStrictEqual(defaultProjectionDataResult);
    });

    it('returns correct values if doesGoalExist is true and data exists', () => {
      const response = getProjectionsData(true, {
        contributionData: [],
        projectionData: [],
        goal: {
          affordableUnDiscountedOutflowAverage: 500,
          affordableUndiscountedOutflowUnderperform: 100,
          desiredDiscountedOutflow: 50,
          shortfallSurplusAverage: 500,
          shortfallSurplusUnderperform: 500,
          onTrack: {
            percentage: 20,
            monthlyContributionsToReach: 500,
            targetProjectionData: [],
            upfrontContributionsToReach: 1000,
          },
          drawdownRetirement: {
            affordable: {
              drawdown: 300,
              lumpSum: 1000,
              remainingAmount: 0,
              totalDrawdown: 10000,
            },
            underperform: {
              drawdown: 300,
              lumpSum: 1000,
              remainingAmount: 0,
              totalDrawdown: 10000,
            },
          },
        },
      });
      expect(response).toStrictEqual({
        affordableDrawdown: 300,
        affordableLumpSum: 1000,
        affordableRemainingAmount: 0,
        affordableTotalDrawdown: 10000,
        affordableUnDiscountedOutflowAverage: 500,
        desiredDiscountedOutflow: 50,
        onTrackPercentage: 20,
        shortfallSurplusAverage: 500,
      });
    });
  });
});
