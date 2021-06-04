import { useSelector } from 'react-redux';
import { ContributionDatum } from '../../../components/organisms/PerformanceChart/performanceData';
import { RootState } from '../../../store';
import { mapContributionsData } from '../utils';
import findDateByPeriod from '../../../utils/date/findDateByPeriod';

export interface UseContributionsDataProps {
  // If true, will ignore performance data period (will always return the full
  // set of data. This is useful for projections chart historical portion, for
  // example.
  ignorePeriod?: boolean;
}

export default function useContributionsData({
  ignorePeriod,
}: UseContributionsDataProps = {}): ContributionDatum[] {
  const { performance, performanceDataPeriod } = useSelector(
    (state: RootState) => state.performance
  );

  if (!performance) {
    return [];
  }

  const { contributions } = performance.included[0].attributes;
  if (ignorePeriod) {
    return contributions.map(mapContributionsData);
  }

  const date = findDateByPeriod(
    contributions.map((contribution) => contribution.date),
    performanceDataPeriod
  );

  return contributions.filter((c) => !date || c.date > date).map(mapContributionsData);
}
