import * as React from 'react';
import { withParentSize } from '@visx/responsive';
import { AreaClosed, Line, LinePath } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import { Group } from '@visx/group';
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from '@visx/responsive/lib/enhancers/withParentSize';
import { max as d3ArrayMax, min as d3ArrayMin } from 'd3-array';
import styled from 'styled-components';
import { curveNatural } from '@visx/curve';
import { Theme } from '../../atoms';
import { usePerformanceProjectionsChartStyles } from './performanceProjectionsChartStyles/performanceProjectionsChartStyles';
import { useTimeValueScales } from '../../../hooks/ChartHooks';
import { PerformanceProjectionsChartAxisBottom } from './PerformanceProjectionsChartAxes';
import PerformanceProjectionsChartGoalIndicator from './PerformanceProjectionsChartGoalIndicator/PerformanceProjectionsChartGoalIndicator';
import { getDatumAtPosX } from '../../../utils/chart';
import { TypedReactMemo } from '../../../utils/common';
import {
  dateAccessor,
  getPerformanceProjectionsDataMaxValue,
  goalNotMetAccessor,
  ProjectionsChartAnnualHistoricalDatum,
  valueAccessor,
  valueDefinedFactory,
} from './performanceProjectionsData';
import {
  ProjectionsChartMetadata,
  ProjectionsChartProjectionDatum,
} from '../../../services/projections';
import { ProjectionsChartGoalDatum } from '../../../services/goal';

export interface PerformanceProjectionsSimplifiedChartProps
  extends WithParentSizeProps,
    WithParentSizeProvidedProps {
  projectionsData: ProjectionsChartProjectionDatum[];
  annualHistoricalData: ProjectionsChartAnnualHistoricalDatum[];
  goalsData: ProjectionsChartGoalDatum[];
  projectionsMetadata: ProjectionsChartMetadata;
}

// ---------- Utilities ---------- //

const MemoizedAreaClosed = TypedReactMemo(AreaClosed);
const MemoizedLinePath = TypedReactMemo(LinePath);

// ---------- Components ---------- //

const Container = styled.div`
  ${({ theme }: { theme: Theme }) => `
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(4)}px;
  `}
`;

function PerformanceProjectionsSimplifiedChart({
  projectionsData,
  annualHistoricalData,
  goalsData,
  projectionsMetadata,
  parentWidth = 0,
}: PerformanceProjectionsSimplifiedChartProps) {
  // ----- Stylings ----- //

  const chartStyles = usePerformanceProjectionsChartStyles('simplified');

  // ----- Chart data ----- //

  const hasProjectionsData = projectionsData.length > 0;
  const { goalMet, zeroValueYear, todayAge } = projectionsMetadata;

  // ----- Chart scales & bounds ----- //

  const chartDimension = {
    width: parentWidth,

    // TODO: responsive margins
    height: chartStyles.DIMENSION.DESKTOP.height,
    margin: chartStyles.DIMENSION.DESKTOP.margin,
  };
  const chartInnerHeight =
    chartDimension.height - chartDimension.margin.top - chartDimension.margin.bottom;
  const chartInnerWidth =
    chartDimension.width - chartDimension.margin.left - chartDimension.margin.right;

  const minChartDate = d3ArrayMin(annualHistoricalData, dateAccessor);
  const maxChartDate = d3ArrayMax(projectionsData, dateAccessor);
  const minChartValue = 0;
  const maxChartValue = getPerformanceProjectionsDataMaxValue(projectionsData, {
    noValueRange: true,
  });

  const { xScale, yScale } = useTimeValueScales({
    chartDimension,
    minDate: minChartDate ?? new Date(0),
    maxDate: maxChartDate ?? new Date(0),
    minValue: minChartValue,
    maxValue: maxChartValue ?? 0,
    maxValueBuffer: 0.75,
    minValueBuffer: 0,
  });

  // ----- Chart accessor ----- //

  const graphDateAccessor = React.useCallback((d) => xScale(dateAccessor(d)) ?? 0, [xScale]);
  const graphProjectedPerformanceAccessor = React.useCallback(
    (d) => yScale(valueAccessor(d)) ?? 0,
    [yScale]
  );
  const graphHistoricalPerformanceAccessor = React.useCallback(
    (d) => yScale(valueAccessor(d)) ?? 0,
    [yScale]
  );
  const graphGoalNotMetAccessor = React.useCallback((d) => yScale(goalNotMetAccessor(d)) ?? 0, [
    yScale,
  ]);

  // If zeroValueYear is undefined, we defined all values in our chart
  const graphProjectedPerformanceDefined = React.useMemo(
    () => (zeroValueYear === undefined ? undefined : valueDefinedFactory(zeroValueYear)),
    [zeroValueYear]
  );

  // ----- Chart ticks ----- //
  // This chart has pre-defined ticks

  const axisBottomStaticTicks: Date[] = [];

  // There is a tick for today's date
  const today = new Date();
  today.setDate(1);
  today.setMonth(0);
  axisBottomStaticTicks.push(today);

  // There is a tick for each goal's date
  goalsData.forEach(({ date }) => {
    axisBottomStaticTicks.push(date);
  });

  // There is a tick for the final date
  if (hasProjectionsData) {
    axisBottomStaticTicks.push(projectionsData[projectionsData.length - 1].date);
  }

  // ----- Goal indicators ----- //

  let goalIndicators: React.ReactNode[] = [];

  if (hasProjectionsData) {
    goalIndicators = goalsData.map(({ date, progress, icon, label }) => {
      const posX = xScale(date) + chartDimension.margin.left;

      const correspondingProjectionsDatum = getDatumAtPosX<ProjectionsChartProjectionDatum>({
        data: projectionsData,
        dateAccessor,
        xScale,
        posX,
      });

      const { value, valueGoalNotMet } = correspondingProjectionsDatum;

      const maxYDataPoint = !goalMet && valueGoalNotMet ? valueGoalNotMet : value;

      return (
        <PerformanceProjectionsChartGoalIndicator
          key={date.valueOf()}
          left={posX}
          top={yScale(maxYDataPoint) - 90}
          label={label}
          icon={icon}
          progress={progress}
        />
      );
    });
  }

  return (
    <Container>
      <svg
        data-testid="performance-projections-simplified-chart-svg"
        width={chartDimension.width}
        height={chartDimension.height}
      >
        {/* ***** Gradients ***** */}

        <LinearGradient
          id="performance-historical-gradient"
          from={chartStyles.GRADIENT.HISTORICAL_GRAPH.from}
          to={chartStyles.GRADIENT.HISTORICAL_GRAPH.to}
          toOffset={chartStyles.GRADIENT.HISTORICAL_GRAPH.toOffset}
          toOpacity={chartStyles.GRADIENT.HISTORICAL_GRAPH.toOpacity}
        />
        <LinearGradient
          id="performance-projections-gradient"
          from={chartStyles.GRADIENT.PROJECTIONS_GRAPH.from}
          to={chartStyles.GRADIENT.PROJECTIONS_GRAPH.to}
          toOffset={chartStyles.GRADIENT.PROJECTIONS_GRAPH.toOffset}
          toOpacity={chartStyles.GRADIENT.PROJECTIONS_GRAPH.toOpacity}
        />

        {/* **** Main components **** */}

        <Group left={chartDimension.margin.left} top={chartDimension.margin.top}>
          {/* ----- Axes ----- */}

          <PerformanceProjectionsChartAxisBottom
            scale={xScale}
            hideAxisLine={false}
            stroke={chartStyles.STROKE_COLOR.GRID}
            strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
            tickLength={8}
            tickValues={axisBottomStaticTicks}
            chartDimension={chartDimension}
            todayAge={todayAge}
            displayMode="simplified"
            finalYear={projectionsData[projectionsData.length - 1].date.getFullYear()}
          />

          {/* ----- Graph paths - Historical ----- */}

          {/* The historical path has 2 components: an AreaClosed and a
              LinePath. The AreaClosed is used purely to create the gradient
              shading. We can't use AreaClosed with stroke because then there
              will be strokes along the chart's 2 sides and bottom, which we
              don't want. */}
          <MemoizedAreaClosed<ProjectionsChartAnnualHistoricalDatum>
            data-testid="performance-projections-simplified-chart-historical-area"
            data={annualHistoricalData}
            x={graphDateAccessor}
            y={graphHistoricalPerformanceAccessor}
            yScale={yScale}
            curve={curveNatural}
            strokeWidth={0}
            fill="url(#performance-historical-gradient)"
          />
          <MemoizedLinePath<ProjectionsChartAnnualHistoricalDatum>
            data-testid="performance-projections-simplified-chart-historical-line"
            data={annualHistoricalData}
            x={graphDateAccessor}
            y={graphHistoricalPerformanceAccessor}
            curve={curveNatural}
            stroke={chartStyles.STROKE_COLOR.HISTORICAL_GRAPH}
            strokeWidth={chartStyles.STROKE_WIDTH.HISTORICAL_GRAPH}
          />

          {/* ----- Graph paths - Projection ----- */}

          {/* The projection path has 2 components: an AreaClosed and a
              LinePath. The AreaClosed is used purely to create the gradient
              shading. We can't use AreaClosed with stroke because then there
              will be strokes along the chart's 2 sides and bottom, which we
              don't want. */}
          <MemoizedAreaClosed<ProjectionsChartProjectionDatum>
            data-testid="performance-projections-simplified-chart-projections-area"
            data={projectionsData}
            x={graphDateAccessor}
            y={graphProjectedPerformanceAccessor}
            yScale={yScale}
            curve={curveNatural}
            strokeWidth={0}
            fill="url(#performance-projections-gradient)"
          />
          <MemoizedLinePath<ProjectionsChartProjectionDatum>
            data-testid="performance-projections-simplified-chart-projections-line"
            data={projectionsData}
            x={graphDateAccessor}
            y={graphProjectedPerformanceAccessor}
            defined={graphProjectedPerformanceDefined}
            curve={curveNatural}
            stroke={chartStyles.STROKE_COLOR.PROJECTIONS_GRAPH}
            strokeWidth={chartStyles.STROKE_WIDTH.PROJECTIONS_GRAPH}
          />

          {/* ----- Graph paths - Goal not met ----- */}

          {/* This line represents the goal-not-met portion of the chart. It
              only appears when performance is projected to not meet the goal
           */}
          {!goalMet && (
            <MemoizedLinePath<ProjectionsChartProjectionDatum>
              data={projectionsData}
              x={graphDateAccessor}
              y={graphGoalNotMetAccessor}
              curve={curveNatural}
              stroke={chartStyles.STROKE_COLOR.GOAL_NOT_MET_GRAPH}
              strokeWidth={chartStyles.STROKE_WIDTH.GOAL_NOT_MET_GRAPH}
              strokeDasharray={chartStyles.STROKE_DASHARRAY.GOAL_NOT_MET_GRAPH}
            />
          )}

          {/* ----- Grids ----- */}

          {/* The left boundary */}
          <Line
            from={{
              x: chartDimension.margin.left,
              y: chartDimension.margin.top,
            }}
            to={{ x: chartDimension.margin.left, y: chartInnerHeight }}
            stroke={chartStyles.STROKE_COLOR.GRID}
            strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
          />

          {/* The right boundary */}
          <Line
            from={{
              x: chartInnerWidth,
              y: chartDimension.margin.top,
            }}
            to={{ x: chartInnerWidth, y: chartInnerHeight }}
            stroke={chartStyles.STROKE_COLOR.GRID}
            strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
          />

          {/* The historical / projection boundary */}
          {hasProjectionsData && (
            <Line
              from={{
                x: xScale(projectionsData[0].date),
                y: chartDimension.margin.top,
              }}
              to={{ x: xScale(projectionsData[0].date), y: chartInnerHeight }}
              stroke={chartStyles.STROKE_COLOR.GRID}
              strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
            />
          )}

          {/* The goal grids - one for each goal */}
          {goalsData.map(({ date }) => (
            <Line
              key={`${date}`}
              stroke={chartStyles.STROKE_COLOR.GRID}
              strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
              from={{
                x: xScale(date),
                y: chartDimension.margin.top,
              }}
              to={{ x: xScale(date), y: chartInnerHeight }}
            />
          ))}
        </Group>
      </svg>

      {/* ***** Goal indicators ***** */}
      {/* These are not part of the <svg> because they are quite customised.
          Thus it's easier to just overlay them as absolute-positioned HTML
           components on top of the chart
       */}

      {goalIndicators}
    </Container>
  );
}

export default withParentSize<PerformanceProjectionsSimplifiedChartProps>(
  PerformanceProjectionsSimplifiedChart
);
