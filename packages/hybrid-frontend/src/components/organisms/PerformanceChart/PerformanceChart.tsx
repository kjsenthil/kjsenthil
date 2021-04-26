import * as React from 'react';
import { withParentSize } from '@visx/responsive';
import { AreaClosed, Bar, Circle, Line, LinePath } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import { GridColumns, GridRows } from '@visx/grid';
import { curveNatural } from '@visx/curve';
import { Group } from '@visx/group';
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from '@visx/responsive/lib/enhancers/withParentSize';
import { Box } from '../../atoms';
import usePerformanceChartScales from './performanceChartScales/usePerformanceChartScales';
import { useContributionsData, usePerformanceData } from './data/data';
import { usePerformanceChartStyles } from './performanceChartStyles/performanceChartStyles';
import PerformanceChartTooltip from './PerformanceChartTooltip/PerformanceChartTooltip';
import usePerformanceChartTooltip from './PerformanceChartTooltip/usePerformanceChartTooltip';
import { getTimeSeriesMinMax, timeSeriesDateAccessor, timeSeriesValueAccessor } from './data/utils';
import { PerformanceChartAxisBottom, PerformanceChartAxisLeft } from './PerformanceChartAxes';

export interface PerformanceChartProps extends WithParentSizeProps, WithParentSizeProvidedProps {}

// ---------- Utilities ---------- //

const MemoizedGridColumns = React.memo(GridColumns);
const MemoizedGridRows = React.memo(GridRows);

const MemoizedAreaClosed = React.memo(AreaClosed);
const MemoizedLinePath = React.memo(LinePath);

// ---------- Components ---------- //

function PerformanceChart({ parentWidth = 0 }: PerformanceChartProps) {
  // ----- Stylings ----- //

  const chartStyles = usePerformanceChartStyles();

  // ----- Chart data ----- //

  const performanceData = usePerformanceData();
  const contributionsData = useContributionsData();

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

  const {
    minDate: minContributionsDate,
    maxDate: maxContributionsDate,
    maxValue: maxContributionsValue,
    minValue: minContributionsValue,
  } = getTimeSeriesMinMax(performanceData);
  const {
    minDate: minValuationsDate,
    maxDate: maxValuationsDate,
    maxValue: maxValuationsValue,
    minValue: minValuationsValue,
  } = getTimeSeriesMinMax(contributionsData);

  const minChartDate = Math.min(minContributionsDate.getTime(), minValuationsDate.getTime());
  const maxChartDate = Math.max(maxContributionsDate.getTime(), maxValuationsDate.getTime());
  const maxChartValue = Math.max(maxContributionsValue, maxValuationsValue);
  const minChartValue = Math.min(minContributionsValue, minValuationsValue);

  const { xScale, yScale } = usePerformanceChartScales({
    chartDimension,
    minDate: new Date(minChartDate),
    maxDate: new Date(maxChartDate),
    maxValue: maxChartValue,
    minValue: minChartValue,
  });

  // ----- Chart accessor ----- //

  const shapeXAccessor = React.useCallback((d) => xScale(timeSeriesDateAccessor(d)) ?? 0, [xScale]);
  const shapeYAccessor = React.useCallback((d) => yScale(timeSeriesValueAccessor(d)) ?? 0, [
    yScale,
  ]);

  // ----- Chart tooltip ----- //

  const {
    tooltip: { hideTooltip, tooltipLeft = 0, tooltipTop = 0, tooltipOpen, tooltipData },
    tooltipInPortal: { containerRef, TooltipInPortal },
    tooltipStyles,
    handleShowContributionsTooltip,
  } = usePerformanceChartTooltip({
    chartDimension,
    performanceData,
    contributionsData,
    xAccessor: timeSeriesDateAccessor,
    yAccessor: timeSeriesValueAccessor,
    xScale,
    yScale,
  });

  return (
    <Box position="relative">
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

        {/* Main chart */}

        <Group left={chartDimension.margin.left} top={chartDimension.margin.top}>
          {/* Axes */}

          <PerformanceChartAxisLeft chartDimension={chartDimension} scale={yScale} />
          <PerformanceChartAxisBottom chartDimension={chartDimension} scale={xScale} />

          {/* ***** Graph paths ***** */}

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
            curve={curveNatural}
            strokeWidth={0}
            fill="url(#historical-performance-gradient)"
            onMouseLeave={() => hideTooltip()}
          />
          <MemoizedLinePath
            data={performanceData}
            x={shapeXAccessor}
            y={shapeYAccessor}
            curve={curveNatural}
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

          {/* This is the chart's tooltip hover detection area */}
          <Bar
            x={chartDimension.margin.left}
            width={chartInnerWidth - chartDimension.margin.left}
            height={chartInnerHeight}
            fill="transparent"
            onTouchStart={handleShowContributionsTooltip}
            onTouchMove={handleShowContributionsTooltip}
            onMouseMove={handleShowContributionsTooltip}
            onMouseLeave={() => hideTooltip()}
          />

          {/* ***** Grids ***** */}

          <MemoizedGridColumns
            scale={xScale}
            width={chartDimension.width - chartDimension.margin.left - chartDimension.margin.right}
            height={chartInnerHeight}
            numTicks={6}
            stroke={chartStyles.STROKE_COLOR.GRID}
            strokeWidth={chartStyles.STROKE_WIDTH.GRID}
            strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
            strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
            pointerEvents="none"
          />
          <MemoizedGridRows
            scale={yScale}
            left={chartDimension.margin.left}
            width={chartInnerWidth - chartDimension.margin.left}
            height={chartInnerHeight}
            numTicks={4}
            stroke={chartStyles.STROKE_COLOR.GRID}
            strokeWidth={chartStyles.STROKE_WIDTH.GRID}
            strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
            strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
            pointerEvents="none"
          />

          {/* ***** Line & dot indicators ***** */}

          {tooltipData && performanceData.length > 0 && contributionsData.length > 0 && (
            <Group>
              <Line
                from={{ x: tooltipLeft, y: tooltipTop }}
                to={{
                  x: tooltipLeft,
                  y: chartInnerHeight,
                }}
                stroke={chartStyles.STROKE_COLOR.INDICATOR}
                strokeWidth={chartStyles.STROKE_WIDTH.GRID}
                pointerEvents="none"
              />
              <Circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={chartStyles.RADIUS.INDICATOR}
                fill={chartStyles.FILL.INDICATOR}
                stroke={chartStyles.STROKE_COLOR.INDICATOR}
                strokeWidth={chartStyles.STROKE_WIDTH.GRID}
                pointerEvents="none"
              />
              <Circle
                cx={tooltipLeft}
                cy={tooltipData.contributionIndicatorPosY}
                r={chartStyles.RADIUS.INDICATOR}
                fill={chartStyles.FILL.INDICATOR}
                stroke={chartStyles.STROKE_COLOR.INDICATOR}
                strokeWidth={chartStyles.STROKE_WIDTH.GRID}
                pointerEvents="none"
              />
            </Group>
          )}

          {/* Tooltip */}

          {tooltipOpen &&
            tooltipData &&
            performanceData.length > 0 &&
            contributionsData.length > 0 && (
              <TooltipInPortal
                key={Math.random()}
                top={tooltipTop}
                left={tooltipLeft}
                style={tooltipStyles}
                offsetLeft={chartDimension.margin.left}
                offsetTop={-100}
              >
                <PerformanceChartTooltip
                  date={tooltipData.performance.date}
                  performance={tooltipData.performance.value}
                  contribution={tooltipData.contribution.value}
                />
              </TooltipInPortal>
            )}
        </Group>
      </svg>
    </Box>
  );
}

export default withParentSize<PerformanceChartProps>(PerformanceChart);
