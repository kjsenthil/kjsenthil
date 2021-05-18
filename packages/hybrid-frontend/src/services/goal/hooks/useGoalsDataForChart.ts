import mockGoalsData from '../../../components/organisms/PerformanceProjectionsChart/performanceProjectionsData/mocks/mock-goals-data.json';
import { mapDate } from '../../../components/organisms/PerformanceProjectionsChart/performanceProjectionsData/utils';
import { ProjectionsChartGoalDatum } from '../types';

export default function useGoalsDataForChart(): ProjectionsChartGoalDatum[] {
  // TODO: replace with actual API data when it's ready

  return mockGoalsData.data.map(mapDate);
}
