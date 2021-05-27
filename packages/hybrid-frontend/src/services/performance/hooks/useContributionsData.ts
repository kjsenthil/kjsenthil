import { useSelector } from 'react-redux';
import { ContributionDatum } from '../../../components/organisms/PerformanceChart/performanceData';
import { sliceIndexBasedOnPeriod } from '../constants';
import { RootState } from '../../../store';
import { mapContributionsData } from '../utils';

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

  if (ignorePeriod) {
    return performance.included[0].attributes.contributions.map(mapContributionsData);
  }

  return performance.included[0].attributes.contributions
    .slice(-sliceIndexBasedOnPeriod[performanceDataPeriod])
    .map(mapContributionsData);
}
