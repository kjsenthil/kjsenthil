import mockHistoricalData from './mocks/mock-annual-historical-data.json';
import { ProjectionsChartAnnualHistoricalDatum } from './types';
import { mapDate } from './utils';

export default function useAnnualHistoricalDataForChart(): ProjectionsChartAnnualHistoricalDatum[] {
  // TODO: replace with actual API data when it's ready

  return mockHistoricalData.data.map(mapDate);
}
