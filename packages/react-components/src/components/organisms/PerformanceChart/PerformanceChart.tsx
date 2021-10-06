import * as React from 'react';
import { withParentSize } from '@visx/responsive';
import { AreaClosed, Bar, Line, LinePath } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import { GridColumns, GridRows } from '@visx/grid';
import { curveBasis } from '@visx/curve';
import { Group } from '@visx/group';
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from '@visx/responsive/lib/enhancers/withParentSize';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { ChartDotIndicator, ChartOuterBorder, Theme } from '../../atoms';
import { useChartStyles, useTimeValueScales } from '../../../hooks';
import PerformanceChartTooltip from './PerformanceChartTooltip/PerformanceChartTooltip';
import usePerformanceChartTooltip, {
  TooltipData,
} from './PerformanceChartTooltip/usePerformanceChartTooltip';
import { ContributionDatum, PerformanceDatum } from './performanceData';
import { PerformanceChartAxisBottom, PerformanceChartAxisLeft } from './PerformanceChartAxes';
import PerformanceChartSummaryPanel from './PerformanceChartSummaryPanel/PerformanceChartSummaryPanel';
import { ChartPeriodSelectionProps, LegendProps } from '../../molecules';
import {
  normalizeTimeSeriesData,
  timeSeriesDateAccessor,
  timeSeriesValueAccessor,
} from '../../../utils/chart';
import getTimeSeriesMinMax from '../../../utils/chart/getTimeSeriesMinMax';
import { usePerformanceChartDimension } from './hooks';
import { PerformanceDataPeriod } from '../../../services';
import { xScaleConfig } from '../../../config/chart/performanceChart';
import PerformanceChartAxisTick from './PerformanceChartTickComponent/PerformanceChartAxisTick';
import { d3ValueFormatter } from '../../../utils/formatters';
import getPerformanceChartAxisLeftTickValues from './PerformanceChartAxes/getPerformanceChartAxisLeftTickValues';

export interface PerformanceChartProps extends WithParentSizeProps, WithParentSizeProvidedProps {
  performanceData: PerformanceDatum[];
  contributionsData: ContributionDatum[];
  periodSelectionProps: ChartPeriodSelectionProps<PerformanceDataPeriod>;

  legendProps?: Record<string, Pick<LegendProps, 'title' | 'tooltip'>>;
  // axisBottomConfig?: Record<string, { numTicks: number; tickFormatterType: D3TimeFormatterType }>;
}

// ---------- Utilities ---------- //

const MemoizedGridRows = React.memo(GridRows);
const MemoizedGridColumns = React.memo(GridColumns);
const MemoizedBar = React.memo(Bar);
const MemoizedAreaClosed = React.memo(AreaClosed);
const MemoizedLinePath = React.memo(LinePath);

// ---------- Components ---------- //

const Container = styled.div`
  ${({ theme }: { theme: Theme }) => `
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(4)}px;
  `}
`;

const ControlPanelContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    justify-content: space-between;
    gap: ${theme.spacing(2)}px;
  `}
`;

function PerformanceChart({
  performanceData: preNormalizationPerformanceData,
  contributionsData: preNormalizationContributionsData,
  periodSelectionProps,
  parentWidth = 0,
  legendProps,
}: PerformanceChartProps) {
  // ----- Stylings ----- //

  const chartStyles = useChartStyles();

  // ----- Chart data ----- //

  const performanceData = normalizeTimeSeriesData(preNormalizationPerformanceData);
  const contributionsData = normalizeTimeSeriesData(preNormalizationContributionsData);

  const hasData = performanceData.length > 0 && contributionsData.length > 0;

  // ----- Chart scales & bounds ----- //

  const chartDimension = usePerformanceChartDimension(parentWidth);

  // x-axis (dates) tick values
  // Rather than letting d3 determines the tick values automatically, we make
  // them static depending on the current viewing period.

  const { datesGenerator, columnsCount, formatter } = xScaleConfig[
    periodSelectionProps.currentPeriod
  ];

  const axisBottomDates = datesGenerator(performanceData[performanceData.length - 1].date);
  const axisBottomColumnWidth = (parentWidth - chartDimension.margin.left) / columnsCount;

  // y-axis (portfolio valuation) tick values
  // Rather than letting d3 determines the tick values automatically, we choose
  // them based on the portfolio's valuation.

  const { maxValue: maxContributionsValue, minValue: minContributionsValue } = getTimeSeriesMinMax(
    performanceData
  );
  const { maxValue: maxValuationsValue, minValue: minValuationsValue } = getTimeSeriesMinMax(
    contributionsData
  );

  const maxChartValue = Math.max(maxContributionsValue, maxValuationsValue);
  const minChartValue = Math.min(
    Math.max(minContributionsValue, 0),
    Math.max(minValuationsValue, 0)
  );

  const axisLeftTickValues = getPerformanceChartAxisLeftTickValues({
    minChartValue,
    maxChartValue,
    bandsCount: 4,
  });

  // time-value scale

  const { xScale, yScale } = useTimeValueScales({
    xScaleRange: [chartDimension.margin.left, chartDimension.width - chartDimension.margin.right],
    yScaleRange: [chartDimension.innerHeight, chartDimension.margin.top],
    minDate: axisBottomDates[axisBottomDates.length - 1],
    maxDate: axisBottomDates[0],
    maxValue: axisLeftTickValues[axisLeftTickValues.length - 1],
    minValue: axisLeftTickValues[0],
  });

  // ----- Chart axis labels ----- //

  // y-axis tick labels

  const leftAxisTickLabels = axisLeftTickValues.map((tickValue) => (
    <PerformanceChartAxisTick
      key={tickValue}
      x={chartDimension.margin.left - 5}
      y={yScale(tickValue) - 15}
      chartStyles={chartStyles}
      textAnchor="end"
      text={d3ValueFormatter(tickValue)}
    />
  ));

  // x-axis tick labels

  const bottomAxisTickLabels = axisBottomDates.map((date) => {
    const formattedDate = formatter(dayjs(date));

    return (
      <PerformanceChartAxisTick
        key={`${date}`}
        x={xScale(date) + axisBottomColumnWidth / 2}
        y={chartDimension.height - chartDimension.margin.bottom + 10}
        chartStyles={chartStyles}
        textAnchor="middle"
        text={formattedDate}
      />
    );
  });

  // ----- Lines for axis bar area ----- //

  const axisLeftBarLines = axisLeftTickValues.map((tickValue) => {
    const y = yScale(tickValue);

    return (
      <Line
        key={tickValue}
        from={{ x: 0, y }}
        to={{ x: chartDimension.margin.left, y }}
        stroke={chartStyles.STROKE_COLOR.GRID}
        strokeWidth={chartStyles.STROKE_WIDTH.GRID}
        strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
      />
    );
  });

  const axisBottomBarLines = axisBottomDates.map((date) => {
    const x = xScale(date);

    return (
      <Line
        key={`${date}`}
        from={{ x, y: chartDimension.height }}
        to={{ x, y: chartDimension.height - chartDimension.margin.bottom }}
        stroke={chartStyles.STROKE_COLOR.GRID}
        strokeWidth={chartStyles.STROKE_WIDTH.GRID}
        strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
        pointerEvents="none"
      />
    );
  });

  // ----- Chart accessor ----- //

  const shapeXAccessor = React.useCallback((d) => xScale(timeSeriesDateAccessor(d)) ?? 0, [xScale]);
  const shapeYAccessor = React.useCallback((d) => yScale(timeSeriesValueAccessor(d)) ?? 0, [
    yScale,
  ]);

  // ----- Chart tooltip ----- //

  // Determine the dimension of the tooltip hover area
  const tooltipHoverAreaX = Math.max(xScale(performanceData[0].date), chartDimension.margin.left);
  const tooltipHoverAreaWidth =
    xScale(performanceData[performanceData.length - 1].date) - tooltipHoverAreaX;

  const {
    tooltip: { hideTooltip, tooltipLeft = 0, tooltipTop = 0, tooltipOpen, tooltipData },
    tooltipInPortal: { containerRef, TooltipInPortal },
    tooltipStyles,
    handleShowContributionsTooltip,
  } = usePerformanceChartTooltip({
    performanceData,
    contributionsData,
    xAccessor: timeSeriesDateAccessor,
    yAccessor: timeSeriesValueAccessor,
    xScale,
    yScale,
  });

  // When the chart is not hovered on, we show the tooltip and indicator at the
  // last (latest) data point

  let lastPerformanceDataPoint;
  let lastContributionsDataPoint;
  let defaultTooltipLeft = 0;
  let defaultTooltipTop = 0;
  let defaultTooltipData: TooltipData = {
    performance: { value: 0, date: new Date() },
    contribution: { value: 0, date: new Date() },
    performanceIndicatorPosY: 0,
    contributionIndicatorPosY: 0,
  };

  if (hasData) {
    lastPerformanceDataPoint = performanceData[performanceData.length - 1];
    lastContributionsDataPoint = contributionsData[contributionsData.length - 1];

    defaultTooltipLeft = xScale(performanceData[performanceData.length - 1].date);
    defaultTooltipTop = yScale(timeSeriesValueAccessor(lastPerformanceDataPoint));
    defaultTooltipData = {
      performance: lastPerformanceDataPoint,
      contribution: lastContributionsDataPoint,
      performanceIndicatorPosY: yScale(timeSeriesValueAccessor(lastPerformanceDataPoint)),
      contributionIndicatorPosY: yScale(timeSeriesValueAccessor(lastContributionsDataPoint)),
    };
  }

  // ----- Summary panel ----- //

  let totalPerformance = 0;
  let totalNetContributions = 0;

  if (tooltipData) {
    totalPerformance = tooltipData.performance.value;
    totalNetContributions = tooltipData.contribution.value;
  } else if (hasData) {
    totalPerformance = lastPerformanceDataPoint.value;
    totalNetContributions = lastContributionsDataPoint.value;
  }

  const totalReturn = totalPerformance - totalNetContributions;
  const totalReturnPercentage =
    totalPerformance && totalNetContributions ? totalPerformance / totalNetContributions - 1 : 0;

  return (
    <Container>
      <ControlPanelContainer>
        <PerformanceChartSummaryPanel
          totalPerformance={totalPerformance}
          totalNetContributions={totalNetContributions}
          totalReturn={totalReturn}
          totalReturnPercentage={totalReturnPercentage}
          legendProps={legendProps}
        />
      </ControlPanelContainer>

      <svg
        data-testid="performance-chart-svg"
        ref={containerRef}
        width={chartDimension.width}
        height={chartDimension.height}
      >
        {/* Gradients */}

        <LinearGradient
          id="historical-performance-gradient"
          from={chartStyles.GRADIENT.PERFORMANCE_GRAPH.from}
          to={chartStyles.GRADIENT.PERFORMANCE_GRAPH.to}
          toOffset={chartStyles.GRADIENT.PERFORMANCE_GRAPH.toOffset}
          toOpacity={chartStyles.GRADIENT.PERFORMANCE_GRAPH.toOpacity}
        />

        {/* ***** Grids ***** */}

        <MemoizedGridRows
          scale={yScale}
          width={chartDimension.width}
          height={chartDimension.innerHeight}
          tickValues={axisLeftTickValues}
          stroke={chartStyles.STROKE_COLOR.GRID}
          strokeWidth={chartStyles.STROKE_WIDTH.GRID}
          strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
          pointerEvents="none"
        />

        <MemoizedGridColumns
          scale={xScale}
          width={chartDimension.width}
          height={chartDimension.height}
          tickValues={axisBottomDates}
          stroke={chartStyles.STROKE_COLOR.GRID}
          strokeWidth={chartStyles.STROKE_WIDTH.GRID}
          strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
          pointerEvents="none"
        />

        {/* Main chart */}

        <Group>
          {/* ***** Graph paths ***** */}

          {hasData && (
            <Group>
              {/* The performance graph has 2 components: an AreaClosed and a
              LinePath. The AreaClosed is used purely to create the gradient
              shading. We can't use AreaClosed with stroke because then there
              will be strokes along the chart's 2 sides and bottom, which we
              don't want. */}
              <MemoizedAreaClosed
                data={performanceData}
                x={shapeXAccessor}
                y={shapeYAccessor}
                yScale={yScale}
                curve={curveBasis}
                strokeWidth={0}
                fill="url(#historical-performance-gradient)"
                onMouseLeave={() => hideTooltip()}
              />
              <MemoizedLinePath
                data={performanceData}
                x={shapeXAccessor}
                y={shapeYAccessor}
                curve={curveBasis}
                stroke={chartStyles.STROKE_COLOR.PERFORMANCE_GRAPH}
                strokeWidth={chartStyles.STROKE_WIDTH.PERFORMANCE_GRAPH}
              />

              {/* This is the contribution graph */}
              <MemoizedLinePath
                data={contributionsData}
                x={shapeXAccessor}
                y={shapeYAccessor}
                stroke={chartStyles.STROKE_COLOR.CONTRIBUTION_GRAPH}
                strokeWidth={chartStyles.STROKE_WIDTH.CONTRIBUTION_GRAPH}
                strokeDasharray={chartStyles.STROKE_DASHARRAY.CONTRIBUTION_GRAPH}
              />
            </Group>
          )}

          {/* This is the chart's tooltip hover detection area */}
          <Bar
            x={tooltipHoverAreaX}
            width={tooltipHoverAreaWidth}
            height={chartDimension.innerHeight}
            fill="transparent"
            onTouchStart={handleShowContributionsTooltip}
            onTouchMove={handleShowContributionsTooltip}
            onMouseMove={handleShowContributionsTooltip}
            onMouseLeave={() => hideTooltip()}
          />

          {/* ***** Line & dot indicators ***** */}

          {hasData && (
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
              <ChartDotIndicator
                cx={tooltipData ? tooltipLeft : defaultTooltipLeft}
                cy={
                  tooltipData
                    ? tooltipData.contributionIndicatorPosY
                    : defaultTooltipData.contributionIndicatorPosY
                }
                color={chartStyles.STROKE_COLOR.CONTRIBUTION_GRAPH}
              />
              <ChartDotIndicator
                cx={tooltipData ? tooltipLeft : defaultTooltipLeft}
                cy={
                  tooltipData
                    ? tooltipData.performanceIndicatorPosY
                    : defaultTooltipData.performanceIndicatorPosY
                }
                color={chartStyles.STROKE_COLOR.PERFORMANCE_GRAPH}
              />
            </Group>
          )}

          {/* ***** Tooltip ***** */}

          {hasData && (
            <TooltipInPortal
              key={Math.random()}
              top={chartDimension.innerHeight + 6}
              left={tooltipOpen && tooltipData ? tooltipLeft : defaultTooltipLeft}
              style={tooltipStyles}
            >
              <PerformanceChartTooltip
                date={
                  tooltipOpen && tooltipData
                    ? tooltipData.performance.date
                    : defaultTooltipData.performance.date
                }
              />
            </TooltipInPortal>
          )}
        </Group>

        {/* ***** Axis bars ***** */}
        {/* These bars act as the background color for the axes tick areas */}

        <MemoizedBar
          height={chartDimension.height}
          width={chartDimension.margin.left}
          fill={chartStyles.FILL.AXIS_TICK_AREA}
        />
        {axisLeftBarLines}

        <MemoizedBar
          y={chartDimension.height - chartDimension.margin.bottom}
          height={chartDimension.margin.bottom}
          width={chartDimension.width}
          fill={chartStyles.FILL.AXIS_TICK_AREA}
        />
        {axisBottomBarLines}

        {/* ***** Axes ***** */}
        {/* We provide the axes with custom tick values and labels */}

        <PerformanceChartAxisLeft chartDimension={chartDimension} scale={yScale} tickValues={[]} />
        {leftAxisTickLabels}

        <PerformanceChartAxisBottom
          chartDimension={chartDimension}
          scale={xScale}
          tickValues={[]}
        />
        {bottomAxisTickLabels}

        {/*  ***** Outer border  ***** */}

        <ChartOuterBorder chartDimension={chartDimension} />

        {/* This line separates the y-axis tick area and the actual chart */}
        <Line
          from={{ x: chartDimension.margin.left, y: 0 }}
          to={{ x: chartDimension.margin.left, y: chartDimension.height }}
          stroke={chartStyles.STROKE_COLOR.GRID}
          strokeWidth={chartStyles.STROKE_WIDTH.GRID}
          strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
        />

        {/* This line separates the x-axis tick area and the actual chart */}
        <Line
          from={{ x: 0, y: chartDimension.height - chartDimension.margin.bottom }}
          to={{ x: chartDimension.width, y: chartDimension.height - chartDimension.margin.bottom }}
          stroke={chartStyles.STROKE_COLOR.GRID}
          strokeWidth={chartStyles.STROKE_WIDTH.GRID}
          strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
        />
      </svg>
    </Container>
  );
}

export default withParentSize<PerformanceChartProps>(PerformanceChart);
