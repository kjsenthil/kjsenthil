import { useSelector } from 'react-redux';
import { ContributionDatum } from '../../components/organisms/PerformanceChart/performanceData';
import { RootState } from '../../store';
import { mapContributionsData } from '../../services/performance';
import findDateByPeriod from '../../utils/date/findDateByPeriod/index';

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

  const date = findDateByPeriod(
    contributions.map((contribution) => contribution.date),
    performanceDataPeriod
  );

  const periodContributionsData = contributions
    .filter((c) => !date || c.date > date)
    .map(mapContributionsData);

  // If there is only 1 data point in the dataset (can happen when there is
  // missing data and the period selected is short), the line chart won't
  // render. This piece of code ensures there is always at least a 2 points of
  // data provided for the chart by adding an identical datum dated at the
  // period's beginning .
  if (periodContributionsData.length === 1 && date) {
    periodContributionsData.push({
      value: periodContributionsData[0].value,
      date: new Date(date),
    });
  }

  return periodContributionsData;
}
