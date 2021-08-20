import { useSelector } from 'react-redux';
import { ProgressBarWithLegendProps } from '@tswdts/react-components';
import { RootState } from '../../store';
import { GoalCurrentProjectionsResponse } from '../../services/projections/types';

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

const useGoalPotTrackerProgressBarData = ({
  doesGoalExist,
  goalPotTotal,
  drawdownStartAge,
  drawdownEndAge,
  lumpSum,
  laterLifeLeftOver,
}: GoalPotTrackerProgressBarProps): GoalPotTrackerProgressBarReturn => {
  const {
    goalCurrentProjections: { data },
  } = useSelector((state: RootState) => state);

  const goalCurrentProjectionsData =
    doesGoalExist && data ? data : ({} as GoalCurrentProjectionsResponse);

  const {
    desiredOutflow = goalPotTotal,
    onTrackPercentage = 0,
    affordableLumpSum = lumpSum,
    affordableOutflow = goalPotTotal,
    affordableDrawdown = 0,
    surplusOrShortfall = 0,
    totalAffordableDrawdown = goalPotTotal - lumpSum - laterLifeLeftOver,
    affordableRemainingAmount = laterLifeLeftOver,
  } = goalCurrentProjectionsData;

  const outflow = (onTrackPercentage || 0) <= 1 ? desiredOutflow : affordableOutflow;

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
