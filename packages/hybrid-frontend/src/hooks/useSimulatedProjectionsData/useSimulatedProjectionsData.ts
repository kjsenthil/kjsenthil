import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ProjectionsChartProjectionDatum, ProjectionYear } from '../../services/projections';

export default function useSimulatedProjectionsData(): ProjectionsChartProjectionDatum[] {
  const { data } = useSelector((state: RootState) => state.simulatedProjections);

  if (!data) {
    return [];
  }

  const currentYear = new Date().getFullYear();

  const mapProjectionYearToProjectionDatum = (
    d: ProjectionYear
  ): ProjectionsChartProjectionDatum => ({
    value: d.medium,
    lowerBound: d.low,
    upperBound: d.high,

    // 'actual' is actually projected net contributions. It's just poorly named
    netContributionsToDate: d.actual,

    // Year data received from the API goes from 0 -> n (i.e. 0, 1, 2, etc.
    // years from the current year). We convert it to actual dates here for our
    // chart
    date: new Date(currentYear + d.year, 0, 1),
  });

  return (data.projections || []).map(mapProjectionYearToProjectionDatum);
}
