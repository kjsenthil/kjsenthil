import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { ProjectionsChartProjectionTargetDatum } from '../../services/projections/types';
import { calculateDateAfterMonths } from '../../utils/date';

export default function useProjectionsTargetDataForProjectionsChart(): ProjectionsChartProjectionTargetDatum[] {
  const { data } = useSelector((state: RootState) => state.goalTargetProjections);

  if (!data) {
    return [];
  }

  const today = new Date();

  return data.projections.map(({ month, projectedValue }) => ({
    // Month data received from the API goes from 0 -> n (i.e. 0, 1, 2, etc.
    // month(s) from the current year). We convert it to actual dates here for
    // our chart
    date: calculateDateAfterMonths(today, month),
    value: projectedValue,
  }));
}
