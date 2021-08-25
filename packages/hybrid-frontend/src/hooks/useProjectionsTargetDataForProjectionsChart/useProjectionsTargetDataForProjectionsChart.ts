import { useSelector } from 'react-redux';
import { ProjectionsChartProjectionTargetDatum } from '@tswdts/react-components';
import { RootState } from '../../store';
import { calculateDateAfterMonths } from '../../utils/date';

export default function useProjectionsTargetDataForProjectionsChart(): ProjectionsChartProjectionTargetDatum[] {
  const { data: { goal } = { goal: null } } = useSelector(
    (state: RootState) => state.goalSimulateProjections
  );

  if (!goal?.onTrack.targetProjectionData) {
    return [];
  }

  const today = new Date();

  return goal.onTrack.targetProjectionData.map(({ monthNo, value }) => ({
    // Month data received from the API goes from 0 -> n (i.e. 0, 1, 2, etc.
    // month(s) from the current year). We convert it to actual dates here for
    // our chart
    date: calculateDateAfterMonths(today, monthNo),
    value,
  }));
}
