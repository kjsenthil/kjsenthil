import { useSelector } from 'react-redux';
import { ProjectionsChartProjectionDatum } from '@tswdts/react-components';
import { RootState } from '../../store';
import { calculateDateAfterMonths } from '../../utils/date';

export default function useSimulateProjectionsDataForProjectionsChart(): ProjectionsChartProjectionDatum[] {
  const {
    data: { projectionData, contributionData } = { projectionData: null, contributionData: null },
  } = useSelector((state: RootState) => state.goalSimulateProjections);

  if (!projectionData || !contributionData) {
    return [];
  }

  const today = new Date();

  return projectionData.map((d, index) => ({
    value: d.average,
    lowerBound: d.lower,
    upperBound: d.upper,
    date: calculateDateAfterMonths(today, d.monthNo, true),
    netContributionsToDate: contributionData[index].value,
  }));
}
