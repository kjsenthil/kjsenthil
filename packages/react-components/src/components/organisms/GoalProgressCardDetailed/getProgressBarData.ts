import { GoalState } from './goalState';
import {
  ProgressBarData,
  ProgressBarLegendValue,
} from '../../molecules/ProgressBarWithLegend/ProgressBarWithLegend';

export const EMPTY_LEGEND: ProgressBarLegendValue = {
  title: '',
  value: '',
};
export const EMPTY_PROGRESS_BAR_DATA = {
  progress: 0,
  legendProps: EMPTY_LEGEND,
};

export interface GetProgressBarDataProps {
  goalState: GoalState;

  // Goal will be at 100% progress when lump sum + drawdown + remaining >= target
  target: number;

  affordable: number;
  affordableDrawdown?: number;
  lumpSum?: number;
  remainingAmount?: number;

  // Used to display the age start / age end label
  ageAtStartDate?: number;
  ageAtEndDate?: number;
}

export const getProgressBarData = ({
  goalState,
  target,
  affordable,
  affordableDrawdown,
  lumpSum,
  remainingAmount,
  ageAtStartDate,
  ageAtEndDate,
}: GetProgressBarDataProps): ProgressBarData[] => {
  // If the goal is finished, just show a 100% complete progress bar.
  if (goalState === GoalState.FINISHED) {
    return [
      EMPTY_PROGRESS_BAR_DATA,
      {
        progress: 100,
        legendProps: EMPTY_LEGEND,
      },
    ];
  }

  const progressBarData: ProgressBarData[] = [];
  let total = target;

  if (lumpSum && goalState === GoalState.NOT_THERE_YET) {
    progressBarData.push({
      progress: lumpSum / total,
      legendProps: {
        title: 'Lump sum',
        value: lumpSum,
        chartIndicatorProps: {
          variant: 'solid',
          color: 'tertiary',
          colorShade: 'dark1',
        },
      },
    });
  } else {
    if (lumpSum) total -= lumpSum;

    // If we don't add this, the "affordable" section will be the wrong colour.
    // It's easier to insert an empty lump sum section than to change the default progress bar
    // background colours.
    progressBarData.push(EMPTY_PROGRESS_BAR_DATA);
  }

  if (affordableDrawdown) {
    let legendProps = EMPTY_LEGEND;
    if (lumpSum || remainingAmount) {
      legendProps = {
        // N.B. An en-dash (–) is used here, not a hyphen (-)
        title: `From age ${ageAtStartDate}–${ageAtEndDate}`,
        value: affordableDrawdown,
        chartIndicatorProps: {
          variant: 'solid',
          color: 'tertiary',
          colorShade: 'main',
        },
      };
    }

    progressBarData.push({
      progress: affordableDrawdown / total,
      legendProps,
    });
  } else {
    progressBarData.push({
      progress: affordable / total,
      legendProps: EMPTY_LEGEND,
    });
  }

  if (remainingAmount) {
    progressBarData.push({
      progress: remainingAmount / total,
      legendProps: {
        title: 'Remaining',
        value: remainingAmount,
        chartIndicatorProps: {
          variant: 'solid',
          color: 'tertiary',
          colorShade: 'light2',
        },
      },
    });
  }

  return progressBarData;
};
