import * as React from 'react';
import { withParentSize } from '@visx/responsive';
import { AreaClosed, Bar, Circle, Line, LinePath } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import { Group } from '@visx/group';
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from '@visx/responsive/lib/enhancers/withParentSize';
import { max as d3ArrayMax, min as d3ArrayMin } from 'd3-array';
import styled from 'styled-components';
import { curveNatural } from '@visx/curve';
import { GridRows } from '@visx/grid';
import { Theme } from '../../atoms';
import { usePerformanceProjectionsChartStyles } from './performanceProjectionsChartStyles/performanceProjectionsChartStyles';
import { useTimeValueScales } from '../../../hooks/ChartHooks';
import {
  PerformanceProjectionsChartAxisBottom,
  PerformanceProjectionsChartAxisLeft,
} from './PerformanceProjectionsChartAxes';
import PerformanceProjectionsChartGoalIndicator from './PerformanceProjectionsChartGoalIndicator/PerformanceProjectionsChartGoalIndicator';
import PerformanceProjectionsChartSummaryPanel from './PerformanceProjectionsChartSummaryPanel/PerformanceProjectionsChartSummaryPanel';
import usePerformanceProjectionsChartTooltip, {
  TooltipData,
} from './PerformanceProjectionsChartTooltip/usePerformanceProjectionsChartTooltip';
import PerformanceProjectionsChartTooltip from './PerformanceProjectionsChartTooltip/PerformanceProjectionsChartTooltip';
import { getDatumAtPosX } from '../../../utils/chart';
import { TypedReactMemo } from '../../../utils/common';
import {
  contributionsAccessor,
  dateAccessor,
  getPerformanceProjectionsDataMaxValue,
  goalNotMetAccessor,
  ProjectionsChartAnnualHistoricalDatum,
  valueAccessor,
  valueBadAccessor,
  valueDefinedFactory,
  valueGoodAccessor,
} from './performanceProjectionsData';
import {
  ProjectionsChartMetadata,
  ProjectionsChartProjectionDatum,
} from '../../../services/projections';
import { ProjectionsChartGoalDatum } from '../../../services/goal';

export interface PerformanceProjectionsChartProps
  extends WithParentSizeProps,
    WithParentSizeProvidedProps {
  projectionsData: ProjectionsChartProjectionDatum[];
  annualHistoricalData: ProjectionsChartAnnualHistoricalDatum[];
  goalsData: ProjectionsChartGoalDatum[];
  projectionsMetadata: ProjectionsChartMetadata;
}

// ---------- Utilities ---------- //

const MemoizedGridRows = React.memo(GridRows);
const MemoizedBar = React.memo(Bar);
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

function PerformanceProjectionsChart({
  projectionsData,
  annualHistoricalData,
  goalsData,
  projectionsMetadata,
  parentWidth = 0,
}: PerformanceProjectionsChartProps) {
  // ----- Stylings ----- //

  const chartStyles = usePerformanceProjectionsChartStyles();

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
  const maxChartValue = getPerformanceProjectionsDataMaxValue(projectionsData);

  const { xScale, yScale } = useTimeValueScales({
    chartDimension,
    minDate: minChartDate ?? new Date(0),
    maxDate: maxChartDate ?? new Date(0),
    minValue: minChartValue,
    maxValue: maxChartValue,
    maxValueBuffer: 0.75,
  });

  // ----- Chart accessor ----- //

  const graphDateAccessor = React.useCallback((d) => xScale(dateAccessor(d)) ?? 0, [xScale]);
  const graphProjectedPerformanceAccessor = React.useCallback(
    (d) => yScale(valueAccessor(d)) ?? 0,
    [yScale]
  );
  const graphProjectedPerformanceGoodAccessor = React.useCallback(
    (d) => yScale(valueGoodAccessor(d)) ?? 0,
    [yScale]
  );
  const graphProjectedPerformanceBadAccessor = React.useCallback(
    (d) => yScale(valueBadAccessor(d)) ?? 0,
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
  const graphGoalNotMetAccessor = React.useCallback((d) => yScale(goalNotMetAccessor(d)) ?? 0, [
    yScale,
  ]);

  // If zeroValueYear is undefined, we defined all values in our chart
  const graphProjectedPerformanceDefined = React.useMemo(
    () => (zeroValueYear === undefined ? undefined : valueDefinedFactory(zeroValueYear)),
    [zeroValueYear]
  );

  // ----- Chart tooltip ----- //

  const {
    tooltip: { hideTooltip, tooltipLeft = 0, tooltipTop = 0, tooltipOpen, tooltipData },
    tooltipInPortal: { containerRef, TooltipInPortal },
    tooltipStyles,
    handleShowContributionsTooltip,
  } = usePerformanceProjectionsChartTooltip({
    chartDimension,
    projectionsData,
    goalMet,
    dateAccessor,
    performanceAccessor: valueAccessor,
    contributionAccessor: contributionsAccessor,
    goalNotMetAccessor,
    xScale,
    yScale,
  });

  // When the chart is not hovered on, we show the tooltip and indicator at the
  // first (earliest) data point

  let firstPerformanceProjectionsDataPoint: ProjectionsChartProjectionDatum | undefined;
  let defaultTooltipLeft = 0;
  let defaultTooltipTop = 0;
  let defaultTooltipData: TooltipData | undefined;

  if (hasProjectionsData) {
    // eslint-disable-next-line prefer-destructuring
    firstPerformanceProjectionsDataPoint = projectionsData[0];

    defaultTooltipLeft = graphDateAccessor(firstPerformanceProjectionsDataPoint);
    defaultTooltipTop = graphProjectedPerformanceGoodAccessor(firstPerformanceProjectionsDataPoint);
    defaultTooltipData = {
      performanceProjection: firstPerformanceProjectionsDataPoint,
      performanceIndicatorPosY: yScale(valueAccessor(firstPerformanceProjectionsDataPoint)),
      contributionIndicatorPosY: yScale(
        contributionsAccessor(firstPerformanceProjectionsDataPoint)
      ),
      goalNotMetIndicatorPosY: yScale(goalNotMetAccessor(firstPerformanceProjectionsDataPoint)),
    };
  }

  // ----- Summary panel ----- //

  let performance = 0;
  let performanceLowEnd = 0;
  let performanceHighEnd = 0;
  let contributions = 0;
  let performanceTargetNotMet: number | undefined;

  if (tooltipData) {
    performance = tooltipData.performanceProjection.value;
    performanceLowEnd = tooltipData.performanceProjection.valueBad;
    performanceHighEnd = tooltipData.performanceProjection.valueGood;
    contributions = tooltipData.performanceProjection.netContributionsToDate;
    performanceTargetNotMet = tooltipData.performanceProjection.valueGoalNotMet;
  } else if (firstPerformanceProjectionsDataPoint) {
    performance = firstPerformanceProjectionsDataPoint.value;
    performanceLowEnd = firstPerformanceProjectionsDataPoint.valueBad;
    performanceHighEnd = firstPerformanceProjectionsDataPoint.valueGood;
    contributions = firstPerformanceProjectionsDataPoint.netContributionsToDate;
    performanceTargetNotMet = firstPerformanceProjectionsDataPoint.valueGoalNotMet;
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

      const { valueGood, valueGoalNotMet } = correspondingProjectionsDatum;

      const maxYDataPoint = !goalMet && valueGoalNotMet ? valueGoalNotMet : valueGood;

      return (
        <PerformanceProjectionsChartGoalIndicator
          key={date.valueOf()}
          left={posX}
          top={yScale(maxYDataPoint) - 20}
          label={label}
          icon={icon}
          progress={progress}
        />
      );
    });
  }

  return (
    <Container>
      <PerformanceProjectionsChartSummaryPanel
        performance={performance}
        performanceLowEnd={performanceLowEnd}
        performanceHighEnd={performanceHighEnd}
        contributions={contributions}
        performanceTargetNotMet={!goalMet ? performanceTargetNotMet : undefined}
      />

      <svg
        data-testid="performance-projections-chart-svg"
        ref={containerRef}
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

          <PerformanceProjectionsChartAxisLeft chartDimension={chartDimension} scale={yScale} />
          <PerformanceProjectionsChartAxisBottom
            chartDimension={chartDimension}
            scale={xScale}
            todayAge={todayAge}
          />

          {/* ----- Graph paths - Historical ----- */}

          {/* The historical path has 2 components: an AreaClosed and a
              LinePath. The AreaClosed is used purely to create the gradient
              shading. We can't use AreaClosed with stroke because then there
              will be strokes along the chart's 2 sides and bottom, which we
              don't want. */}
          <MemoizedAreaClosed<ProjectionsChartAnnualHistoricalDatum>
            data={annualHistoricalData}
            x={graphDateAccessor}
            y={graphHistoricalPerformanceAccessor}
            yScale={yScale}
            curve={curveNatural}
            strokeWidth={0}
            fill="url(#performance-historical-gradient)"
          />
          <MemoizedLinePath<ProjectionsChartAnnualHistoricalDatum>
            data={annualHistoricalData}
            x={graphDateAccessor}
            y={graphHistoricalPerformanceAccessor}
            curve={curveNatural}
            stroke={chartStyles.STROKE_COLOR.HISTORICAL_GRAPH}
            strokeWidth={chartStyles.STROKE_WIDTH.HISTORICAL_GRAPH}
          />

          {/* This path represents historical contributions */}
          <MemoizedLinePath<ProjectionsChartAnnualHistoricalDatum>
            data={annualHistoricalData}
            x={graphDateAccessor}
            y={graphContributionsAccessor}
            curve={curveNatural}
            stroke={chartStyles.STROKE_COLOR.CONTRIBUTION_GRAPH}
            strokeWidth={chartStyles.STROKE_WIDTH.CONTRIBUTION_GRAPH}
            strokeDasharray={chartStyles.STROKE_DASHARRAY.CONTRIBUTION_GRAPH}
          />

          {/* ----- Graph paths - Projection ----- */}

          {/* The projection path has 2 components: an AreaClosed and a
              LinePath. The AreaClosed is used purely to create the gradient
              shading. We can't use AreaClosed with stroke because then there
              will be strokes along the chart's 2 sides and bottom, which we
              don't want. */}
          <MemoizedAreaClosed<ProjectionsChartProjectionDatum>
            data={projectionsData}
            x={graphDateAccessor}
            y={graphProjectedPerformanceAccessor}
            yScale={yScale}
            curve={curveNatural}
            strokeWidth={0}
            fill="url(#performance-projections-gradient)"
          />
          <MemoizedLinePath<ProjectionsChartProjectionDatum>
            data={projectionsData}
            x={graphDateAccessor}
            y={graphProjectedPerformanceAccessor}
            defined={graphProjectedPerformanceDefined}
            curve={curveNatural}
            stroke={chartStyles.STROKE_COLOR.PROJECTIONS_GRAPH}
            strokeWidth={chartStyles.STROKE_WIDTH.PROJECTIONS_GRAPH}
          />

          {/* The projection band is just an AreaClosed. It has a transparent
              fill with no stroke color */}
          <MemoizedAreaClosed<ProjectionsChartProjectionDatum>
            data={projectionsData}
            x={graphDateAccessor}
            y0={graphProjectedPerformanceBadAccessor}
            y1={graphProjectedPerformanceGoodAccessor}
            yScale={yScale}
            curve={curveNatural}
            fill={chartStyles.FILL.PROJECTIONS_VARIANCE_BAND_GRAPH}
            opacity={chartStyles.FILL_OPACITY.PROJECTIONS_VARIANCE_BAND_GRAPH}
          />

          {/* This path represents projected contributions */}
          <MemoizedLinePath<ProjectionsChartProjectionDatum>
            data={projectionsData}
            x={graphDateAccessor}
            y={graphContributionsAccessor}
            defined={graphProjectedPerformanceDefined}
            curve={curveNatural}
            stroke={chartStyles.STROKE_COLOR.CONTRIBUTION_GRAPH}
            strokeWidth={chartStyles.STROKE_WIDTH.CONTRIBUTION_GRAPH}
            strokeDasharray={chartStyles.STROKE_DASHARRAY.CONTRIBUTION_GRAPH}
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

          {/* ----- Others ----- */}

          {/* This is the chart's tooltip hover detection area.
              Only the projection portion of the chart can be hovered on.
           */}
          {hasProjectionsData && (
            <MemoizedBar
              x={graphDateAccessor(firstPerformanceProjectionsDataPoint)}
              width={chartInnerWidth - graphDateAccessor(firstPerformanceProjectionsDataPoint)}
              height={chartInnerHeight}
              fill="transparent"
              onTouchStart={handleShowContributionsTooltip}
              onTouchMove={handleShowContributionsTooltip}
              onMouseMove={handleShowContributionsTooltip}
              onMouseLeave={() => hideTooltip()}
            />
          )}

          {/* ----- Grids ----- */}

          <MemoizedGridRows
            scale={yScale}
            left={chartDimension.margin.left}
            width={chartInnerWidth - chartDimension.margin.left}
            height={chartInnerHeight}
            numTicks={6}
            stroke={chartStyles.STROKE_COLOR.GRID}
            strokeWidth={chartStyles.STROKE_WIDTH.GRID}
            strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
            strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
            pointerEvents="none"
          />

          {/* ----- Line & dot indicators ----- */}

          {hasProjectionsData && defaultTooltipData && (
            <Group>
              <Line
                from={{
                  x: tooltipData ? tooltipLeft : defaultTooltipLeft,
                  y: tooltipData ? tooltipTop : defaultTooltipTop,
                }}
                to={{
                  x: tooltipData ? tooltipLeft : defaultTooltipLeft,
                  y: chartInnerHeight - chartDimension.margin.top,
                }}
                stroke={chartStyles.STROKE_COLOR.INDICATOR}
                strokeWidth={chartStyles.STROKE_WIDTH.INDICATOR_LINE}
                pointerEvents="none"
              />
              <Circle
                cx={tooltipData ? tooltipLeft : defaultTooltipLeft}
                cy={
                  tooltipData
                    ? tooltipData.performanceIndicatorPosY
                    : defaultTooltipData.performanceIndicatorPosY
                }
                r={chartStyles.RADIUS.INDICATOR}
                fill={chartStyles.FILL.INDICATOR}
                stroke={chartStyles.STROKE_COLOR.INDICATOR}
                strokeWidth={chartStyles.STROKE_WIDTH.INDICATOR_CIRCLE}
                pointerEvents="none"
              />
              <Circle
                cx={tooltipData ? tooltipLeft : defaultTooltipLeft}
                cy={
                  tooltipData
                    ? tooltipData.contributionIndicatorPosY
                    : defaultTooltipData.contributionIndicatorPosY
                }
                r={chartStyles.RADIUS.INDICATOR}
                fill={chartStyles.FILL.INDICATOR}
                stroke={chartStyles.STROKE_COLOR.INDICATOR}
                strokeWidth={chartStyles.STROKE_WIDTH.INDICATOR_CIRCLE}
                pointerEvents="none"
              />
              {!goalMet && (
                <Circle
                  cx={tooltipData ? tooltipLeft : defaultTooltipLeft}
                  cy={
                    tooltipData
                      ? tooltipData.goalNotMetIndicatorPosY
                      : defaultTooltipData.goalNotMetIndicatorPosY
                  }
                  r={chartStyles.RADIUS.INDICATOR}
                  fill={chartStyles.FILL.INDICATOR}
                  stroke={chartStyles.STROKE_COLOR.INDICATOR}
                  strokeWidth={chartStyles.STROKE_WIDTH.INDICATOR_CIRCLE}
                  pointerEvents="none"
                />
              )}
            </Group>
          )}

          {/* ***** Tooltip ***** */}

          {hasProjectionsData && defaultTooltipData && (
            <TooltipInPortal
              key={Math.random()}
              top={chartInnerHeight - chartDimension.margin.top + 5}
              left={tooltipOpen && tooltipData ? tooltipLeft : defaultTooltipLeft}
              style={tooltipStyles}
              offsetLeft={chartDimension.margin.left}
            >
              <PerformanceProjectionsChartTooltip
                date={
                  tooltipOpen && tooltipData
                    ? tooltipData.performanceProjection.date
                    : defaultTooltipData.performanceProjection.date
                }
                todayAge={todayAge}
              />
            </TooltipInPortal>
          )}
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

export default withParentSize<PerformanceProjectionsChartProps>(PerformanceProjectionsChart);
