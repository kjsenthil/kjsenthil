import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { ProjectionsChartProjectionDatum, ProjectionYear } from '../index';

export default function useProjectionsDataForChart(): ProjectionsChartProjectionDatum[] {
  const { projections } = useSelector((state: RootState) => state.projections.projections);

  if (!projections) {
    return [];
  }

  const currentYear = new Date().getFullYear();

  const mapProjectionYearToProjectionDatum = (
    d: ProjectionYear
  ): ProjectionsChartProjectionDatum => ({
    value: d.medium,
    valueBad: d.low,
    valueGood: d.high,

    // 'actual' is actually projected net contributions. It's just poorly named
    netContributionsToDate: d.actual,

    // Year data received from the API goes from 0 -> n (i.e. 0, 1, 2, etc.
    // years from the current year). We convert it to actual dates here for our
    // chart
    date: new Date(currentYear + d.year, 0, 1),
  });

  return projections.map(mapProjectionYearToProjectionDatum);
}
