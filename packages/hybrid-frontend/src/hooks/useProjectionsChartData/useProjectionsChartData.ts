import {
  ProjectionsChartHistoricalDatum,
  ProjectionsChartMetadata,
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '@tswdts/react-components';
import useProjectionsMetadataForProjectionsChart from '../useProjectionsMetadataForProjectionsChart';
import useProjectionsTargetDataForProjectionsChart from '../useProjectionsTargetDataForProjectionsChart';
import useSimulateProjectionsDataForProjectionsChart from '../useSimulateProjectionsDataForProjectionsChart';
import useHistoricalDataForProjectionsChart from '../useHistoricalDataForProjectionsChart';
import useGoalsDataForChart, {
  GoalOptionsForChart,
  GoalDataForChart,
} from '../useGoalsDataForChart';

interface ProjectionsChartData {
  projectionsData: ProjectionsChartProjectionDatum[];
  projectionsTargetData: ProjectionsChartProjectionTargetDatum[];
  historicalData: ProjectionsChartHistoricalDatum[];
  goalsData: GoalDataForChart[];
  projectionsMetadata: ProjectionsChartMetadata;
}

const useProjectionsChartData = (
  goalOptionsForChart: GoalOptionsForChart
): ProjectionsChartData => ({
  projectionsMetadata: useProjectionsMetadataForProjectionsChart(),
  historicalData: useHistoricalDataForProjectionsChart(),
  projectionsTargetData: useProjectionsTargetDataForProjectionsChart(), // might wanna specify goal
  projectionsData: useSimulateProjectionsDataForProjectionsChart(), // might wanna specify goal
  goalsData: useGoalsDataForChart(goalOptionsForChart),
});

export default useProjectionsChartData;
