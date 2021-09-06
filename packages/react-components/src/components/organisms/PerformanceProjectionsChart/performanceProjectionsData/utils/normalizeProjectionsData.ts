import { ProjectionsChartProjectionDatum } from '../../../../../services';

// Ensure the chart never renders any negative numbers
export default function normalizeProjectionsData(
  data: ProjectionsChartProjectionDatum[]
): ProjectionsChartProjectionDatum[] {
  return data.map((d) => ({
    ...d,
    value: Math.max(d.value, 0),
    netContributionsToDate: Math.max(d.netContributionsToDate, 0),
    lowerBound: Math.max(d.lowerBound, 0),
    upperBound: Math.max(d.upperBound, 0),
  }));
}
