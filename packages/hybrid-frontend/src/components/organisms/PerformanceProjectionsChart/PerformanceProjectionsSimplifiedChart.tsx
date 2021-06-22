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
import { Theme, Typography } from '../../atoms';
import { useChartStyles, useTimeValueScales } from '../../../hooks';
import { PerformanceProjectionsChartAxisBottom } from './PerformanceProjectionsChartAxes';
import PerformanceProjectionsChartGoalIndicator from './PerformanceProjectionsChartGoalIndicator/PerformanceProjectionsChartGoalIndicator';
import { getDatumAtPosX } from '../../../utils/chart';
import { TypedReactMemo } from '../../../utils/common';
import {
  contributionsAccessor,
  dateAccessor,
  getPerformanceProjectionsDataMaxValue,
  getPerformanceProjectionsDataMinValue,
  valueAccessor,
  valueTargetAccessor,
} from './performanceProjectionsData';
import {
  ProjectionsChartMetadata,
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../services/projections';
import { ProjectionsChartGoalDatum } from '../../../services/goal';
import { ProjectionsChartHistoricalDatum } from '../../../services/performance';
import { usePerformanceProjectionsSimplifiedChartDimension } from './performanceProjectionsChartDimension/usePerformanceProjectionsChartDimension';
import contributionsDefined from './performanceProjectionsData/utils/contributionsDefined';

export interface PerformanceProjectionsSimplifiedChartProps
  extends WithParentSizeProps,
    WithParentSizeProvidedProps {
  projectionsData: ProjectionsChartProjectionDatum[];
  projectionsTargetData?: ProjectionsChartProjectionTargetDatum[];

  historicalData: ProjectionsChartHistoricalDatum[];
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
  projectionsTargetData,
  historicalData,
  goalsData,
  projectionsMetadata,
  parentWidth = 0,
}: PerformanceProjectionsSimplifiedChartProps) {
  // ----- Stylings ----- //

  const chartStyles = useChartStyles();

  // ----- Chart data ----- //

  const hasHistoricalData = historicalData.length > 0;
  const hasProjectionsData = projectionsData.length > 0;
  const hasProjectionsTargetData = projectionsTargetData && projectionsTargetData.length > 0;
  const { todayAge } = projectionsMetadata;

  // ----- Chart scales & bounds ----- //

  const chartDimension = usePerformanceProjectionsSimplifiedChartDimension(parentWidth);

  const minChartDate = d3ArrayMin(historicalData, dateAccessor);

  // We need to combine projection and projection target data to get the
  // appropriate max chart date.
  const maxProjectionsDate = d3ArrayMax(projectionsData, dateAccessor);
  const maxProjectionsTargetDate = d3ArrayMax(projectionsTargetData ?? [], dateAccessor);
  const maxChartDate = d3ArrayMax(
    [maxProjectionsDate, maxProjectionsTargetDate].filter(
      (date: Date | undefined): date is Date => !!date
    )
  );

  const minChartValue = getPerformanceProjectionsDataMinValue({
    projectionsData,
    projectionsTargetData,
    noValueRange: true,
  });
  const maxChartValue = getPerformanceProjectionsDataMaxValue({
    projectionsData,
    projectionsTargetData,
    noValueRange: true,
  });

  const { xScale, yScale } = useTimeValueScales({
    chartDimension,
    minDate: minChartDate,
    maxDate: maxChartDate,
    minValue: minChartValue,
    maxValue: maxChartValue,
    maxValueBuffer: 0.75,
    minValueBuffer: 0,
  });

  // ----- Chart accessor ----- //

  const graphDateAccessor = React.useCallback((d) => xScale(dateAccessor(d)) ?? 0, [xScale]);
  const graphProjectedPerformanceAccessor = React.useCallback(
    (d) => yScale(valueAccessor(d)) ?? 0,
    [yScale]
  );
  const graphContributionsAccessor = React.useCallback(
    (d) => yScale(contributionsAccessor(d)) ?? 0,
    [yScale]
  );
  const graphHistoricalPerformanceAccessor = React.useCallback(
    (d) => yScale(valueAccessor(d)) ?? 0,
    [yScale]
  );
  const graphProjectionTargetAccessor = React.useCallback(
    (d) => yScale(valueTargetAccessor(d)) ?? 0,
    [yScale]
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
      const posX = xScale(date);

      const correspondingProjectionsDatum = getDatumAtPosX<ProjectionsChartProjectionDatum>({
        data: projectionsData,
        dateAccessor,
        xScale,
        posX,
      });
      const correspondingProjectionsTargetDatum =
        projectionsTargetData &&
        getDatumAtPosX<ProjectionsChartProjectionTargetDatum>({
          data: projectionsTargetData,
          dateAccessor,
          xScale,
          posX,
        });

      // We don't display projection bands in the simplified chart, thus the
      // highest value of the projections dataset is the "middle" projection
      // value.
      const { value: highestProjectionValue } = correspondingProjectionsDatum;
      const projectionTargetValue = correspondingProjectionsTargetDatum?.value ?? 0;
      const maxYDataPoint = Math.max(highestProjectionValue, projectionTargetValue);

      return (
        <PerformanceProjectionsChartGoalIndicator
          key={date.valueOf()}
          left={posX + chartDimension.margin.left}
          top={yScale(maxYDataPoint) - 90}
          label={label}
          icon={icon}
          progress={progress}
        />
      );
    });
  }

  // ----- Render ----- //

  // Throw some sort of error when there is no historical or projections data.
  if (!hasHistoricalData || !hasProjectionsData) {
    return (
      <Container>
        <Typography>
          The chart needs both historical and projections data to render and one of these or both
          are missing!
        </Typography>
      </Container>
    );
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
          from={chartStyles.GRADIENT.PERFORMANCE_GRAPH.from}
          to={chartStyles.GRADIENT.PERFORMANCE_GRAPH.to}
          toOffset={chartStyles.GRADIENT.PERFORMANCE_GRAPH.toOffset}
          toOpacity={chartStyles.GRADIENT.PERFORMANCE_GRAPH.toOpacity}
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
          <MemoizedAreaClosed<ProjectionsChartHistoricalDatum>
            data-testid="performance-projections-simplified-chart-historical-area"
            data={historicalData}
            x={graphDateAccessor}
            y={graphHistoricalPerformanceAccessor}
            yScale={yScale}
            curve={curveNatural}
            strokeWidth={0}
            fill="url(#performance-historical-gradient)"
          />
          <MemoizedLinePath<ProjectionsChartHistoricalDatum>
            data-testid="performance-projections-simplified-chart-historical-line"
            data={historicalData}
            x={graphDateAccessor}
            y={graphHistoricalPerformanceAccessor}
            curve={curveNatural}
            stroke={chartStyles.STROKE_COLOR.PERFORMANCE_GRAPH}
            strokeWidth={chartStyles.STROKE_WIDTH.PERFORMANCE_GRAPH}
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
            curve={curveNatural}
            stroke={chartStyles.STROKE_COLOR.PROJECTIONS_GRAPH}
            strokeWidth={chartStyles.STROKE_WIDTH.PROJECTIONS_GRAPH}
          />

          {/* This path represents projected contributions */}
          <MemoizedLinePath<ProjectionsChartProjectionDatum>
            data={projectionsData}
            x={graphDateAccessor}
            y={graphContributionsAccessor}
            defined={contributionsDefined}
            curve={curveNatural}
            stroke={chartStyles.STROKE_COLOR.CONTRIBUTION_GRAPH}
            strokeWidth={chartStyles.STROKE_WIDTH.CONTRIBUTION_GRAPH}
            strokeDasharray={chartStyles.STROKE_DASHARRAY.CONTRIBUTION_GRAPH}
          />

          {/* ----- Graph paths - Projection target ----- */}

          {/* This line represents the projection target portion of the chart.
              It only appears when performance is projected to not meet the
              goal.
           */}
          {hasProjectionsTargetData && (
            <MemoizedLinePath<ProjectionsChartProjectionTargetDatum>
              data={projectionsTargetData}
              x={graphDateAccessor}
              y={graphProjectionTargetAccessor}
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
            to={{ x: chartDimension.margin.left, y: chartDimension.innerHeight }}
            stroke={chartStyles.STROKE_COLOR.GRID}
            strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
          />

          {/* The right boundary */}
          <Line
            from={{
              x: chartDimension.innerWidth,
              y: chartDimension.margin.top,
            }}
            to={{ x: chartDimension.innerWidth, y: chartDimension.innerHeight }}
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
              to={{ x: xScale(projectionsData[0].date), y: chartDimension.innerHeight }}
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
              to={{ x: xScale(date), y: chartDimension.innerHeight }}
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
