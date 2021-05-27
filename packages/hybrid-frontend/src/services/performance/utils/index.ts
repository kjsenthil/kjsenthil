import {
  ContributionDatum,
  PerformanceDatum,
} from '../../../components/organisms/PerformanceChart/performanceData';

export function mapContributionsData<T extends { date: string; netContributionsToDate: number }>(
  d: T
): ContributionDatum {
  return {
    date: new Date(d.date),
    value: d.netContributionsToDate,
  };
}

export function mapPerformanceData<T extends { date: string; value: number }>(
  d: T
): PerformanceDatum {
  return {
    date: new Date(d.date),
    value: d.value,
  };
}
