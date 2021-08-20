import { useSelector } from 'react-redux';
import { ProjectionsChartProjectionDatum } from '@tswdts/react-components';
import { ProjectionMonth } from '../../services/projections';
import { RootState } from '../../store';
import { calculateDateAfterMonths } from '../../utils/date';

export default function useCurrentProjectionsDataForProjectionsChart(): ProjectionsChartProjectionDatum[] {
  const { data: { projections } = { projections: null } } = useSelector(
    (state: RootState) => state.goalCurrentProjections
  );

  if (!projections) {
    return [];
  }

  const today = new Date();

  const mapProjectionYearToProjectionDatum = (
    d: ProjectionMonth
  ): ProjectionsChartProjectionDatum => ({
    value: d.projectedValue,
    lowerBound: d.lowerBound,
    upperBound: d.upperBound,
    netContributionsToDate: d.contributionLine,
    date: calculateDateAfterMonths(today, d.month, true),
  });

  return projections.map(mapProjectionYearToProjectionDatum);
}
