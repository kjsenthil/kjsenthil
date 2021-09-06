import * as React from 'react';
import { withParentSize } from '@visx/responsive';
import { AreaClosed, Bar, Line, LinePath } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import { Group } from '@visx/group';
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from '@visx/responsive/lib/enhancers/withParentSize';
import { max as d3ArrayMax, min as d3ArrayMin } from 'd3-array';
import styled from 'styled-components';
import { curveBasis } from '@visx/curve';
import { GridRows } from '@visx/grid';
import { Theme, Typography } from '../../atoms';
import { useBreakpoint, useChartStyles, useTimeValueScales } from '../../../hooks';
import {
  PerformanceProjectionsChartAxisBottom,
  PerformanceProjectionsChartAxisLeft,
} from './PerformanceProjectionsChartAxes';
import PerformanceProjectionsChartGoalIndicator from './PerformanceProjectionsChartGoalIndicator/PerformanceProjectionsChartGoalIndicator';
import PerformanceProjectionsChartSummaryPanel from './PerformanceProjectionsChartSummaryPanel/PerformanceProjectionsChartSummaryPanel';
import usePerformanceProjectionsChartTooltip from './PerformanceProjectionsChartTooltip/usePerformanceProjectionsChartTooltip';
import PerformanceProjectionsChartTooltip from './PerformanceProjectionsChartTooltip/PerformanceProjectionsChartTooltip';
import { getDatumAtPosX, normalizeTimeSeriesData } from '../../../utils/chart';
import { TypedReactMemo } from '../../../utils/common';
import {
  contributionsAccessor,
  dateAccessor,
  getPerformanceProjectionsDataMaxValue,
  getPerformanceProjectionsDataMinValue,
  lowerBoundAccessor,
  normalizeHistoricalData,
  normalizeProjectionsData,
  upperBoundAccessor,
  valueAccessor,
  valueTargetAccessor,
} from './performanceProjectionsData';
import {
  ProjectionsChartGoalDatum,
  ProjectionsChartHistoricalDatum,
  ProjectionsChartMetadata,
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../services';
import contributionsDefined from './performanceProjectionsData/utils/contributionsDefined';
import usePerformanceProjectionsChartDimension from './hooks/usePerformanceProjectionsChartDimension';
import PerformanceProjectionsChartDotIndicator from './PerformanceProjectionsChartDotIndicator/PerformanceProjectionsChartDotIndicator';
import PerformanceProjectionsChartOuterBorder from './PerformanceProjectionsChartOuterBorder/PerformanceProjectionsChartOuterBorder';
import { SvgAndGoalIndicatorsContainer } from './PerformanceProjectionsChart.styles';
import PerformanceProjectionsChartAxisBottomLabelMobile from './PerformanceProjectionsChartAxes/PerformanceProjectionsChartAxisBottomLabelMobile';
import getPerformanceProjectionsChartSummaryPanelValues from './PerformanceProjectionsChartSummaryPanel/getPerformanceProjectionsChartSummaryPanelValues';
import getDefaultProjectionsDataPoint from './performanceProjectionsData/utils/getDefaultProjectionsDataPoint';
import getDefaultTooltipData from './PerformanceProjectionsChartTooltip/getDefaultTooltipData';

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
  toggleLikelyRange?: () => void;

  // These controls the display properties of the summary panel
  panelOptions?: {
    displayContributions?: boolean;
    displayLikelyRangeLegend?: boolean;
    displayLikelyRangeToggle?: boolean;
  };

  // If true, the users won't be able to hover over the chart and there will be
  // no tooltip
  noHover?: boolean;
}

// ---------- Utilities ---------- //

const MemoizedGridRows = React.memo(GridRows);
const MemoizedBar = React.memo(Bar);
const MemoizedLine = React.memo(Line);
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
  projectionsData: preNormalizationProjectionsData,
  projectionsTargetData: preNormalizationProjectionsTargetData,
  historicalData: preNormalizationHistoricalData,
  goalsData,
  projectionsMetadata,
  showLikelyRange,
  toggleLikelyRange,
  panelOptions = {
    displayContributions: true,
    displayLikelyRangeLegend: true,
    displayLikelyRangeToggle: true,
  },
  noHover,
  parentWidth = 0,
}: PerformanceProjectionsChartProps) {
  // ----- Stylings ----- //

  const chartStyles = useChartStyles();
  const { isMobile } = useBreakpoint();

  // ----- Chart data ----- //

  const projectionsData = normalizeProjectionsData(preNormalizationProjectionsData);
  const projectionsTargetData = preNormalizationProjectionsTargetData
    ? normalizeTimeSeriesData(preNormalizationProjectionsTargetData)
    : undefined;
  const historicalData = normalizeHistoricalData(preNormalizationHistoricalData);

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

  const minChartValue = Math.max(
    getPerformanceProjectionsDataMinValue({
      projectionsData,
      projectionsTargetData,
      historicalData,
    }),
    0
  );
  const maxChartValue = getPerformanceProjectionsDataMaxValue({
    projectionsData,
    projectionsTargetData,
    historicalData,
  });

  const { xScale, yScale } = useTimeValueScales({
    xScaleRange: [chartDimension.margin.left, chartDimension.width - chartDimension.margin.right],
    yScaleRange: [chartDimension.innerHeight, chartDimension.margin.top],
    minDate: minChartDate,
    maxDate: maxChartDate,
    minValue: minChartValue,
    maxValue: maxChartValue,
    maxValueBuffer: 0.75,
  });

  // ----- Chart accessor ----- //

  const graphDateAccessor = React.useCallback((d) => xScale(dateAccessor(d)) ?? 0, [xScale]);
  const graphProjectionAccessor = React.useCallback((d) => yScale(valueAccessor(d)) ?? 0, [yScale]);
  const graphProjectionUpperBoundAccessor = React.useCallback(
    (d) => yScale(upperBoundAccessor(d)) ?? 0,
    [yScale]
  );
  const graphProjectionLowerBoundAccessor = React.useCallback(
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

  const {
    defaultProjectionTargetDataPoint,
    defaultProjectionDataPoint,
  } = getDefaultProjectionsDataPoint({
    historicalData,
    projectionsData,
    projectionsTargetData,
  });

  const { defaultTooltipLeft, defaultTooltipTop, defaultTooltipData } = getDefaultTooltipData({
    defaultProjectionTargetDataPoint,
    defaultProjectionDataPoint,
    scaledDateAccessor: graphDateAccessor,
    scaledProjectionAccessor: graphProjectionAccessor,
    scaledProjectionUpperBoundAccessor: graphProjectionUpperBoundAccessor,
    scaledContributionAccessor: graphContributionsAccessor,
    scaledProjectionTargetAccessor: graphProjectionTargetAccessor,
  });

  // ----- Summary panel ----- //

  const summaryPanelValues = getPerformanceProjectionsChartSummaryPanelValues({
    tooltipData,
    defaultDataPoint: defaultProjectionDataPoint,
    defaultTargetDataPoint: defaultProjectionTargetDataPoint,
  });

  // ----- Chart ticks ----- //
  // This chart has pre-defined ticks

  const axisBottomStaticTicks: Date[] = [];

  // There is a tick for the latest datum of the historical dataset. If this is
  // not available, use today.
  let today;
  if (hasHistoricalData) {
    today = historicalData[0].date;
  } else {
    today = new Date();
    today.setDate(1);
    today.setMonth(0);
  }
  axisBottomStaticTicks.push(today);

  // There is a tick for each goal's date
  goalsData.forEach(({ date }) => {
    axisBottomStaticTicks.push(date);
  });

  // There is a tick for the final date
  if (hasProjectionsData) {
    axisBottomStaticTicks.push(projectionsData[projectionsData.length - 1].date);
  }

  // ----- Chart tick columns ----- //
  // For each pre-defined tick, there is a corresponding "grid" column

  const chartTickColumns = axisBottomStaticTicks.map((tick) => {
    const columnX = xScale(tick);

    return (
      <MemoizedLine
        key={`${tick.getTime()}`}
        from={{ x: columnX, y: 0 }}
        to={{ x: columnX, y: chartDimension.innerHeight }}
        strokeWidth={chartStyles.STROKE_WIDTH.GRID}
        stroke={chartStyles.STROKE_COLOR.GRID}
        strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
      />
    );
  });

  // ----- Goal indicators ----- //

  let goalIndicators: React.ReactNode[] = [];

  if (hasProjectionsData) {
    goalIndicators = goalsData.map(({ date, label }) => {
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
          left={posX}
          top={yScale(maxYDataPoint) - 50}
          label={label}
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
        performance={summaryPanelValues.performance}
        performanceLowEnd={
          panelOptions.displayContributions ? summaryPanelValues.performanceLowEnd : undefined
        }
        performanceHighEnd={
          panelOptions.displayContributions ? summaryPanelValues.performanceHighEnd : undefined
        }
        contributions={
          panelOptions.displayContributions ? summaryPanelValues.contributions : undefined
        }
        performanceTargetNotMet={summaryPanelValues.performanceTargetNotMet}
        showLikelyRange={showLikelyRange}
        toggleLikelyRange={panelOptions.displayLikelyRangeToggle ? toggleLikelyRange : undefined}
        showLikelyRangeLegend={panelOptions.displayLikelyRangeLegend ?? false}
        noHover={noHover}
      />

      <SvgAndGoalIndicatorsContainer>
        <svg
          data-testid="performance-projections-chart-svg"
          ref={containerRef}
          width={chartDimension.width}
          height={chartDimension.height}
        >
          {/* ***** Gradients & Filters ***** */}

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

          {/* This is the drop shadow filter for the dot indicators */}
          {/* The width and height prevents the shadow from being cut off */}
          <filter id="dot-indicator-drop-shadow" height="200%" width="200%">
            <feDropShadow floodColor="rgba(112, 120, 135, 0.24)" />
          </filter>

          {/* **** Main components **** */}

          {/* This bar paints the chart with a background colour (it's
            transparent by default */}
          <MemoizedBar
            width={chartDimension.width}
            height={chartDimension.height}
            fill={chartStyles.FILL.BACKGROUND}
          />

          {/* These bars act as the background color for the axes' tick areas */}
          <MemoizedBar
            height={chartDimension.height}
            width={chartDimension.margin.left}
            fill={chartStyles.FILL.AXIS_TICK_AREA}
          />
          <MemoizedBar
            y={chartDimension.height - chartDimension.margin.bottom}
            height={chartDimension.margin.bottom}
            width={chartDimension.width}
            fill={chartStyles.FILL.AXIS_TICK_AREA}
          />

          <Group>
            {/* ----- Axes ----- */}

            <PerformanceProjectionsChartAxisLeft chartDimension={chartDimension} scale={yScale} />
            <PerformanceProjectionsChartAxisBottom
              chartDimension={chartDimension}
              scale={xScale}
              todayAge={todayAge}
              tickValues={axisBottomStaticTicks}
              finalYear={projectionsData[projectionsData.length - 1].date.getFullYear()}
            />

            {isMobile && (
              <PerformanceProjectionsChartAxisBottomLabelMobile chartDimension={chartDimension} />
            )}

            {/* ----- Outer border ----- */}

            <PerformanceProjectionsChartOuterBorder chartDimension={chartDimension} />

            {/* ----- Grids ----- */}

            <MemoizedGridRows
              scale={yScale}
              width={chartDimension.width}
              height={chartDimension.innerHeight}
              numTicks={6}
              stroke={chartStyles.STROKE_COLOR.GRID}
              strokeWidth={chartStyles.STROKE_WIDTH.GRID}
              strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
              pointerEvents="none"
            />

            {/* This column separates the y-axis tick area and the actual
              chart */}
            <Line
              from={{ x: chartDimension.margin.left, y: 0 }}
              to={{ x: chartDimension.margin.left, y: chartDimension.height }}
              stroke={chartStyles.STROKE_COLOR.GRID}
              strokeWidth={chartStyles.STROKE_WIDTH.GRID}
              strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
            />

            {/* ----- Tick columns ----- */}

            {chartTickColumns}

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
              curve={curveBasis}
              strokeWidth={0}
              fill="url(#performance-historical-gradient)"
            />
            <MemoizedLinePath<ProjectionsChartHistoricalDatum>
              data={historicalData}
              x={graphDateAccessor}
              y={graphHistoricalPerformanceAccessor}
              curve={curveBasis}
              stroke={chartStyles.STROKE_COLOR.PERFORMANCE_GRAPH}
              strokeWidth={chartStyles.STROKE_WIDTH.PERFORMANCE_GRAPH}
            />

            {/* This path represents historical contributions */}
            <MemoizedLinePath<ProjectionsChartHistoricalDatum>
              data={historicalData}
              x={graphDateAccessor}
              y={graphContributionsAccessor}
              curve={curveBasis}
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
              y={graphProjectionAccessor}
              yScale={yScale}
              curve={curveBasis}
              strokeWidth={0}
              fill="url(#performance-projections-gradient)"
            />
            <MemoizedLinePath<ProjectionsChartProjectionDatum>
              data={projectionsData}
              x={graphDateAccessor}
              y={graphProjectionAccessor}
              curve={curveBasis}
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
              y0={graphProjectionLowerBoundAccessor}
              y1={graphProjectionUpperBoundAccessor}
              yScale={yScale}
              curve={curveBasis}
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
              curve={curveBasis}
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
                curve={curveBasis}
                stroke={chartStyles.STROKE_COLOR.GOAL_NOT_MET_GRAPH}
                strokeWidth={chartStyles.STROKE_WIDTH.GOAL_NOT_MET_GRAPH}
                strokeDasharray={chartStyles.STROKE_DASHARRAY.GOAL_NOT_MET_GRAPH}
              />
            )}

            {/* ----- Others ----- */}

            {/* This is the chart's tooltip hover detection area.
              Only the projection portion of the chart can be hovered on.
           */}
            {!noHover && hasProjectionsData && (
              <MemoizedBar
                x={defaultTooltipLeft}
                width={chartDimension.width - chartDimension.margin.right - defaultTooltipLeft}
                height={chartDimension.innerHeight}
                fill="transparent"
                onTouchStart={handleShowContributionsTooltip}
                onTouchMove={handleShowContributionsTooltip}
                onMouseMove={handleShowContributionsTooltip}
                onMouseLeave={() => hideTooltip()}
              />
            )}

            {/* ----- Line & dot indicators ----- */}

            {!noHover && hasProjectionsData && defaultTooltipData && (
              <Group>
                <Line
                  from={{
                    x: tooltipData ? tooltipLeft : defaultTooltipLeft,
                    y: tooltipData ? tooltipTop : defaultTooltipTop,
                  }}
                  to={{
                    x: tooltipData ? tooltipLeft : defaultTooltipLeft,
                    y: chartDimension.innerHeight,
                  }}
                  stroke={chartStyles.STROKE_COLOR.INDICATOR}
                  strokeWidth={chartStyles.STROKE_WIDTH.INDICATOR_LINE}
                  pointerEvents="none"
                />
                {hasProjectionsTargetData && tooltipData?.goalNotMetIndicatorPosY !== undefined && (
                  <PerformanceProjectionsChartDotIndicator
                    cx={tooltipData ? tooltipLeft : defaultTooltipLeft}
                    cy={
                      tooltipData
                        ? tooltipData.goalNotMetIndicatorPosY
                        : defaultTooltipData.goalNotMetIndicatorPosY
                    }
                    color={chartStyles.STROKE_COLOR.GOAL_NOT_MET_GRAPH}
                    filter="url(#dot-indicator-drop-shadow)"
                  />
                )}
                <PerformanceProjectionsChartDotIndicator
                  cx={tooltipData ? tooltipLeft : defaultTooltipLeft}
                  cy={
                    tooltipData
                      ? tooltipData.contributionIndicatorPosY
                      : defaultTooltipData.contributionIndicatorPosY
                  }
                  color={chartStyles.STROKE_COLOR.CONTRIBUTION_GRAPH}
                  filter="url(#dot-indicator-drop-shadow)"
                />
                <PerformanceProjectionsChartDotIndicator
                  cx={tooltipData ? tooltipLeft : defaultTooltipLeft}
                  cy={
                    tooltipData
                      ? tooltipData.performanceIndicatorPosY
                      : defaultTooltipData.performanceIndicatorPosY
                  }
                  // Users can't hover over historical (performance graph)
                  // portions, so the only time this dot indicator has the
                  // historical color is when it's in its default position (i.e.
                  // when the chart is not hovered on.
                  color={
                    tooltipLeft > defaultTooltipLeft
                      ? chartStyles.STROKE_COLOR.PROJECTIONS_GRAPH
                      : chartStyles.STROKE_COLOR.PERFORMANCE_GRAPH
                  }
                  filter="url(#dot-indicator-drop-shadow)"
                />
              </Group>
            )}

            {/* ***** Tooltip ***** */}

            {!noHover && hasProjectionsData && defaultTooltipData && (
              <TooltipInPortal
                key={Math.random()}
                // The 7px offset is 1px less than the axis bottom tick length of
                // 8px
                top={chartDimension.innerHeight - chartDimension.margin.top - 7}
                left={tooltipOpen && tooltipData ? tooltipLeft : defaultTooltipLeft}
                style={tooltipStyles}
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
      </SvgAndGoalIndicatorsContainer>
    </Container>
  );
}

export default withParentSize<PerformanceProjectionsChartProps>(PerformanceProjectionsChart);
