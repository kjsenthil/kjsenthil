import { ProjectionsChartHistoricalDatum } from '../../../../../services/performance';

// Ensure the chart never renders any negative numbers
export default function normalizeHistoricalData(
  data: ProjectionsChartHistoricalDatum[]
): ProjectionsChartHistoricalDatum[] {
  return data.map((d) => ({
    ...d,
    value: Math.max(d.value, 0),
    netContributionsToDate: Math.max(d.netContributionsToDate, 0),
  }));
}
