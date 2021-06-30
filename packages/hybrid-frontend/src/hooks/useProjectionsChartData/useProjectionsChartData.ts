import useProjectionsMetadataForProjectionsChart from '../useProjectionsMetadataForProjectionsChart';
import useProjectionsTargetDataForProjectionsChart from '../useProjectionsTargetDataForProjectionsChart';
import useCurrentProjectionsDataForProjectionsChart from '../useCurrentProjectionsDataForProjectionsChart';
import { ProjectionsChartHistoricalDatum } from '../../services/performance';
import useHistoricalDataForProjectionsChart from '../useHistoricalDataForProjectionsChart';
import useGoalsDataForChart, {
  GoalOptionsForChart,
  GoalDataForChart,
} from '../useGoalsDataForChart';
import {
  ProjectionsChartMetadata,
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../services/projections';

interface ProjectionsChartData {
  projectionsData: ProjectionsChartProjectionDatum[];
  projectionsTargetData: ProjectionsChartProjectionTargetDatum[];
  historicalData: ProjectionsChartHistoricalDatum[];
  goalsData: GoalDataForChart[];
  projectionsMetadata: ProjectionsChartMetadata;
}

const useProjectionsChartData = (goalDataForChart: GoalOptionsForChart): ProjectionsChartData => ({
  projectionsMetadata: useProjectionsMetadataForProjectionsChart(),
  historicalData: useHistoricalDataForProjectionsChart(),
  projectionsTargetData: useProjectionsTargetDataForProjectionsChart(), // might wanna specify goal
  projectionsData: useCurrentProjectionsDataForProjectionsChart(), // might wanna specify goal
  goalsData: useGoalsDataForChart(goalDataForChart),
});

export default useProjectionsChartData;
