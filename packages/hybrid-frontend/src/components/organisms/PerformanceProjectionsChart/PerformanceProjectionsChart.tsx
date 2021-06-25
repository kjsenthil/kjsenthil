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
import { Theme, Typography } from '../../atoms';
import { useTimeValueScales, useChartStyles } from '../../../hooks';
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
  valueTargetAccessor,
  valueAccessor,
  lowerBoundAccessor,
  upperBoundAccessor,
  getPerformanceProjectionsDataMinValue,
} from './performanceProjectionsData';
import {
  ProjectionsChartMetadata,
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../services/projections';
import { ProjectionsChartGoalDatum } from '../../../services/goal';
import { ProjectionsChartHistoricalDatum } from '../../../services/performance';
import contributionsDefined from './performanceProjectionsData/utils/contributionsDefined';
import { usePerformanceProjectionsChartDimension } from './performanceProjectionsChartDimension/usePerformanceProjectionsChartDimension';

export interface PerformanceProjectionsChartProps
  extends WithParentSizeProps,
    WithParentSizeProvidedProps {
  projectionsData: ProjectionsChartProjectionDatum[];
  projectionsTargetData?: ProjectionsChartProjectionTargetDatum[];

  historicalData: ProjectionsChartHistoricalDatum[];
  goalsData: ProjectionsChartGoalDatum[];
  projectionsMetadata: ProjectionsChartMetadata;

  // If true, will always show the projections likely range band. Otherwise,
  // will only show the band on hover.
  showLikelyRange: boolean;

  // A function used by the likely range toggle to toggle likely range
  toggleLikelyRange: () => void;
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
  projectionsTargetData,
  historicalData,
  goalsData,
  projectionsMetadata,
  showLikelyRange,
  toggleLikelyRange,
  parentWidth = 0,
}: PerformanceProjectionsChartProps) {
  // ----- Stylings ----- //

  const chartStyles = useChartStyles();

  // ----- Chart data ----- //

  const hasHistoricalData = historicalData.length > 0;
  const hasProjectionsData = projectionsData.length > 0;
  const hasProjectionsTargetData = projectionsTargetData && projectionsTargetData.length > 0;
  const { todayAge } = projectionsMetadata;

  // ----- Chart scales & bounds ----- //

  const chartDimension = usePerformanceProjectionsChartDimension(parentWidth);

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
  });
  const maxChartValue = getPerformanceProjectionsDataMaxValue({
    projectionsData,
    projectionsTargetData,
  });

  const { xScale, yScale } = useTimeValueScales({
    chartDimension,
    minDate: minChartDate,
    maxDate: maxChartDate,
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
    (d) => yScale(upperBoundAccessor(d)) ?? 0,
    [yScale]
  );
  const graphProjectedPerformanceBadAccessor = React.useCallback(
    (d) => yScale(lowerBoundAccessor(d)) ?? 0,
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

  // ----- Chart tooltip ----- //

  const {
    tooltip: { hideTooltip, tooltipLeft = 0, tooltipTop = 0, tooltipOpen, tooltipData },
    tooltipInPortal: { containerRef, TooltipInPortal },
    tooltipStyles,
    handleShowContributionsTooltip,
  } = usePerformanceProjectionsChartTooltip({
    chartDimension,
    projectionsData,
    projectionsTargetData,
    dateAccessor,
    performanceAccessor: valueAccessor,
    contributionAccessor: contributionsAccessor,
    projectionTargetAccessor: valueTargetAccessor,
    xScale,
    yScale,
  });

  // When the chart is not hovered on, we show the tooltip and indicator at the
  // first (earliest) data point

  let firstPerformanceProjectionsDataPoint: ProjectionsChartProjectionDatum | undefined;
  let firstPerformanceProjectionsTargetDataPoint: ProjectionsChartProjectionTargetDatum | undefined;
  let defaultTooltipLeft = 0;
  let defaultTooltipTop = 0;
  let defaultTooltipData: TooltipData | undefined;

  if (hasProjectionsData) {
    [firstPerformanceProjectionsDataPoint] = projectionsData;

    if (hasProjectionsTargetData) {
      // Need this "!" post-fix operator else TypeScript doesn't know that we've
      // already checked for projectionsTargetData's existence via
      // hasProjectionsTargetData
      [firstPerformanceProjectionsTargetDataPoint] = projectionsTargetData!;
    }

    defaultTooltipLeft = graphDateAccessor(firstPerformanceProjectionsDataPoint);
    defaultTooltipTop = graphProjectedPerformanceGoodAccessor(firstPerformanceProjectionsDataPoint);
    defaultTooltipData = {
      performanceProjection: firstPerformanceProjectionsDataPoint,
      performanceProjectionTarget: firstPerformanceProjectionsTargetDataPoint,
      performanceIndicatorPosY: yScale(valueAccessor(firstPerformanceProjectionsDataPoint)),
      contributionIndicatorPosY: yScale(
        contributionsAccessor(firstPerformanceProjectionsDataPoint)
      ),
      goalNotMetIndicatorPosY: yScale(valueTargetAccessor(firstPerformanceProjectionsDataPoint)),
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
    performanceLowEnd = tooltipData.performanceProjection.lowerBound;
    performanceHighEnd = tooltipData.performanceProjection.upperBound;
    contributions = tooltipData.performanceProjection.netContributionsToDate;
    performanceTargetNotMet = tooltipData.performanceProjectionTarget?.value;
  } else if (firstPerformanceProjectionsDataPoint) {
    performance = firstPerformanceProjectionsDataPoint.value;
    performanceLowEnd = firstPerformanceProjectionsDataPoint.lowerBound;
    performanceHighEnd = firstPerformanceProjectionsDataPoint.upperBound;
    contributions = firstPerformanceProjectionsDataPoint.netContributionsToDate;
    performanceTargetNotMet = firstPerformanceProjectionsTargetDataPoint?.value;
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

      // The highest value of the projections dataset is the "top-range" value.
      const { upperBound: highestProjectionValue } = correspondingProjectionsDatum;
      const projectionTargetValue = correspondingProjectionsTargetDatum?.value ?? 0;
      const maxYDataPoint = Math.max(highestProjectionValue, projectionTargetValue);

      return (
        <PerformanceProjectionsChartGoalIndicator
          key={date.valueOf()}
          left={posX + chartDimension.margin.left}
          top={yScale(maxYDataPoint) - 20}
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
      <PerformanceProjectionsChartSummaryPanel
        performance={performance}
        performanceLowEnd={performanceLowEnd}
        performanceHighEnd={performanceHighEnd}
        contributions={contributions}
        performanceTargetNotMet={performanceTargetNotMet}
        showLikelyRange={showLikelyRange}
        toggleLikelyRange={toggleLikelyRange}
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
        {/* This is the gradient for the projections likely range band hover
            mask. It helps the mask achieve the opacity effect on its left and
            right side (if the opacity effect is not needed, simply use a
            <clipPath>). */}
        <LinearGradient
          id="performance-projections-likely-range-band-mask-gradient"
          vertical={false}
        >
          <stop offset="0%" stopColor="white" stopOpacity={0} />
          <stop offset="50%" stopColor="white" stopOpacity={1} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </LinearGradient>

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
          <MemoizedAreaClosed<ProjectionsChartHistoricalDatum>
            data={historicalData}
            x={graphDateAccessor}
            y={graphHistoricalPerformanceAccessor}
            yScale={yScale}
            curve={curveNatural}
            strokeWidth={0}
            fill="url(#performance-historical-gradient)"
          />
          <MemoizedLinePath<ProjectionsChartHistoricalDatum>
            data={historicalData}
            x={graphDateAccessor}
            y={graphHistoricalPerformanceAccessor}
            curve={curveNatural}
            stroke={chartStyles.STROKE_COLOR.PERFORMANCE_GRAPH}
            strokeWidth={chartStyles.STROKE_WIDTH.PERFORMANCE_GRAPH}
          />

          {/* This path represents historical contributions */}
          <MemoizedLinePath<ProjectionsChartHistoricalDatum>
            data={historicalData}
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
            curve={curveNatural}
            stroke={chartStyles.STROKE_COLOR.PROJECTIONS_GRAPH}
            strokeWidth={chartStyles.STROKE_WIDTH.PROJECTIONS_GRAPH}
          />

          {/* ----- Graph paths - Projection likely range band ----- */}

          {/* This mask "hides" all portions of the graph outside the bar's
              area. This is only used when the chart is in "hide likely range"
              mode (hence the height tooltipData / height = 0 check - when the
              mask's height is 0, the likely range band won't be drawn). */}
          <mask id="performance-projections-likely-range-band-mask">
            <MemoizedBar
              x={tooltipLeft - chartStyles.WIDTH.PROJECTIONS_LIKELY_RANGE_BAND_MASK / 2}
              width={chartStyles.WIDTH.PROJECTIONS_LIKELY_RANGE_BAND_MASK}
              height={tooltipData ? chartDimension.innerHeight : 0}
              fill="url(#performance-projections-likely-range-band-mask-gradient)"
            />
          </mask>

          {/* The projection likely range band is just an AreaClosed. It has a
              transparent fill with no stroke color. In addition, if the chart
              is in "hide likely range" mode, a mask effect is applied so that
              the band is hidden by default and only portions of it is shown on
              hover. */}
          <MemoizedAreaClosed<ProjectionsChartProjectionDatum>
            data={projectionsData}
            x={graphDateAccessor}
            y0={graphProjectedPerformanceBadAccessor}
            y1={graphProjectedPerformanceGoodAccessor}
            yScale={yScale}
            curve={curveNatural}
            fill={chartStyles.FILL.PROJECTIONS_VARIANCE_BAND_GRAPH}
            opacity={chartStyles.FILL_OPACITY.PROJECTIONS_VARIANCE_BAND_GRAPH}
            mask={
              showLikelyRange ? undefined : 'url(#performance-projections-likely-range-band-mask)'
            }
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

          {/* ----- Others ----- */}

          {/* This is the chart's tooltip hover detection area.
              Only the projection portion of the chart can be hovered on.
           */}
          {hasProjectionsData && (
            <MemoizedBar
              x={graphDateAccessor(firstPerformanceProjectionsDataPoint)}
              width={
                chartDimension.innerWidth - graphDateAccessor(firstPerformanceProjectionsDataPoint)
              }
              height={chartDimension.innerHeight}
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
            width={chartDimension.innerWidth - chartDimension.margin.left}
            height={chartDimension.innerHeight}
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
                  y: chartDimension.innerHeight - chartDimension.margin.top,
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
              {hasProjectionsTargetData && tooltipData?.goalNotMetIndicatorPosY !== undefined && (
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
              top={chartDimension.innerHeight - chartDimension.margin.top + 5}
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
