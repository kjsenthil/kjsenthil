import { useSelector } from 'react-redux';
import { ContributionDatum } from '../../components/organisms/PerformanceChart/performanceData';
import { RootState } from '../../store';
import { mapContributionsData, filterAndMapContributionData } from '../../services/performance';

export interface UseContributionsDataProps {
  // If true, will ignore performance data period (will always return the full
  // set of data. This is useful for projections chart historical portion, for
  // example.
  ignorePeriod?: boolean;
}

export default function useContributionsData({
  ignorePeriod,
}: UseContributionsDataProps = {}): ContributionDatum[] {
  const { included, performanceDataPeriod } = useSelector((state: RootState) => state.performance);

  if (!included) {
    return [];
  }

  const { netContributions: contributions } = included[0].attributes;
  if (ignorePeriod) {
    return contributions.map(mapContributionsData);
  }

  return filterAndMapContributionData(contributions, performanceDataPeriod);
}
