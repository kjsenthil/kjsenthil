import { useSelector } from 'react-redux';
import { ProjectionsChartProjectionDatum } from '@tswdts/react-components';
import { RootState } from '../../store';
import { ProjectionYear } from '../../services/projections';

export interface UseSimulatedProjectionsDataProps {
  // Provide an initial date. Without this, there can be a mismatch between the
  // last historical datum and the first simulated projection datum. With an
  // initial date, we'll set the month of each simulated projection data to the
  // same month as the initial date.
  firstDate?: Date;
}

export default function useSimulatedProjectionsData({
  firstDate,
}: UseSimulatedProjectionsDataProps = {}): ProjectionsChartProjectionDatum[] {
  const { data } = useSelector((state: RootState) => state.simulatedProjections);

  if (!data) {
    return [];
  }

  // The simulated projections data is a time-series dataset with no specific
  // date. Its time axis is denoted by the 'year' field which is an integer
  // going from 0 to n. We need to convert these years into actual dates.
  // The very first date will be either today's year (if no 'firstDate' is
  // provided), or the 'firstDate' year.

  let firstYear = new Date().getFullYear();
  let firstMonth = 0;

  if (firstDate) {
    firstYear = firstDate.getFullYear();
    firstMonth = firstDate.getMonth();
  }

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
    date: new Date(firstYear + d.year, firstMonth, 1),
  });

  return (data.projections || []).map(mapProjectionYearToProjectionDatum);
}
