import * as React from 'react';
import { renderHook, ResultContainer } from '@testing-library/react-hooks';
import { configureStore, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import useGoalPotTrackerProgressBarData, {
  GoalPotTrackerProgressBarProps,
  GoalPotTrackerProgressBarReturn,
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
  onTrackPercentage: 0.6,
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

describe('useGoalPotTrackerProgressBarData', () => {
  let renderedHook: ResultContainer<GoalPotTrackerProgressBarReturn>;

  describe('when no goalCurrentProjections is not present', () => {
    const store = configureStore({
      reducer: {
        goalCurrentProjections: () => ({
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

  describe('when goalCurrentProjections is present', () => {
    const store = configureStore({
      reducer: {
        goalCurrentProjections: () => ({
          data,
        }),
      },
    });

    it('returns default results from props if doesGoalExist is false', () => {
      renderedHook = getRenderedHook(store, { ...props, doesGoalExist: false });
      expect(renderedHook.result.current).toStrictEqual(defaultResult);
    });

    describe('when onTrackPercentage is less than or equal to 1', () => {
      it('returns results from store if doesGoalExist is true calculating percentrage using desiredOutflow', () => {
        renderedHook = getRenderedHook(store, { ...props, doesGoalExist: true });
        expect(renderedHook.result.current).toStrictEqual(desiredOutflowResults);
      });

      it('returns results from store if doesGoalExist is true calculating percentrage using desiredOutflow', () => {
        data.onTrackPercentage = 1;
        renderedHook = getRenderedHook(store, { ...props, doesGoalExist: true });
        expect(renderedHook.result.current).toStrictEqual({
          ...desiredOutflowResults,
          onTrack: data.onTrackPercentage,
        });
      });
    });

    describe('when onTrackPercentage is more than 1', () => {
      it('returns results from store if doesGoalExist is true calculating percentrage using affordableOutflow', () => {
        data.onTrackPercentage = 1.1;
        renderedHook = getRenderedHook(store, { ...props, doesGoalExist: true });
        expect(renderedHook.result.current).toStrictEqual({
          ...affordableOutflowResults,
          onTrack: data.onTrackPercentage,
        });
      });
    });
  });
});
