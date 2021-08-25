import { useSelector } from 'react-redux';
import { ProgressBarWithLegendProps } from '@tswdts/react-components';
import { RootState } from '../../store';
import { GoalSimulateProjectionsResponse } from '../../services/projections/types';

export interface GoalPotTrackerProgressBarProps {
  doesGoalExist: boolean;
  goalPotTotal: number;
  drawdownStartAge: number;
  drawdownEndAge: number;
  lumpSum: number;
  laterLifeLeftOver: number;
}

export interface GoalPotTrackerProgressBarReturn {
  goalPotTrackerProgressBarData: ProgressBarWithLegendProps['progressBarData'];
  target: number;
  onTrack: number;
  surplusOrShortfall: number;
  totalProjected: number;
  drawdownMonthlyIncome: number;
}

export function getProjectionsData(
  doesGoalExist: boolean,
  data?: GoalSimulateProjectionsResponse
): {
  desiredDiscountedOutflow?: number;
  onTrackPercentage?: number;
  affordableUnDiscountedOutflowAverage?: number;
  shortfallSurplusAverage?: number;
  affordableLumpSum?: number;
  affordableDrawdown?: number;
  affordableTotalDrawdown?: number;
  affordableRemainingAmount?: number;
} {
  const { goal } = doesGoalExist && data ? data : ({} as GoalSimulateProjectionsResponse);
  return {
    desiredDiscountedOutflow: goal?.desiredDiscountedOutflow,
    onTrackPercentage: goal?.onTrack?.percentage,
    affordableUnDiscountedOutflowAverage: goal?.affordableUnDiscountedOutflowAverage,
    shortfallSurplusAverage: goal?.shortfallSurplusAverage,
    affordableLumpSum: goal?.drawdownRetirement?.affordable?.lumpSum,
    affordableDrawdown: goal?.drawdownRetirement?.affordable?.drawdown,
    affordableTotalDrawdown: goal?.drawdownRetirement?.affordable?.totalDrawdown,
    affordableRemainingAmount: goal?.drawdownRetirement?.affordable?.remainingAmount,
  };
}

const useGoalPotTrackerProgressBarData = ({
  doesGoalExist,
  goalPotTotal,
  drawdownStartAge,
  drawdownEndAge,
  lumpSum,
  laterLifeLeftOver,
}: GoalPotTrackerProgressBarProps): GoalPotTrackerProgressBarReturn => {
  const {
    goalSimulateProjections: { data },
  } = useSelector((state: RootState) => state);

  const goal = getProjectionsData(doesGoalExist, data);

  const desiredOutflow = goal?.desiredDiscountedOutflow ?? goalPotTotal;
  const onTrackPercentage = goal?.onTrackPercentage ?? 0;
  const affordableLumpSum = goal?.affordableLumpSum ?? lumpSum;
  const affordableOutflow = goal?.affordableUnDiscountedOutflowAverage ?? goalPotTotal;
  const affordableDrawdown = goal?.affordableDrawdown ?? 0;
  const surplusOrShortfall = goal?.shortfallSurplusAverage ?? 0;
  const totalAffordableDrawdown =
    goal?.affordableTotalDrawdown ?? goalPotTotal - lumpSum - laterLifeLeftOver;
  const affordableRemainingAmount = goal?.affordableRemainingAmount ?? laterLifeLeftOver;
  const outflow = (onTrackPercentage || 0) <= 100 ? desiredOutflow : affordableOutflow;

  const goalPotTrackerProgressBarData: ProgressBarWithLegendProps['progressBarData'] = [
    {
      legendProps: {
        title: `Lump sum`,
        value: affordableLumpSum,
      },
      progress: affordableLumpSum / outflow,
    },
    {
      legendProps: {
        title: `From age ${drawdownStartAge} to ${drawdownEndAge}`,
        value: totalAffordableDrawdown,
      },
      progress: totalAffordableDrawdown / outflow,
    },
    {
      legendProps: {
        title: `Remaining amount`,
        value: affordableRemainingAmount ?? laterLifeLeftOver,
      },
      progress: affordableRemainingAmount / outflow,
    },
  ].filter(({ progress }) => progress > 0); // This prevents inputs that haven't yet been filled in from being shown

  return {
    goalPotTrackerProgressBarData,
    target: desiredOutflow,
    onTrack: onTrackPercentage,
    surplusOrShortfall,
    totalProjected: affordableOutflow,
    drawdownMonthlyIncome: affordableDrawdown,
  };
};

export default useGoalPotTrackerProgressBarData;
