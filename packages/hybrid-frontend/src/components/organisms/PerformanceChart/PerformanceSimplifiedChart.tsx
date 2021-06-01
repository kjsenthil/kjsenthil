import * as React from 'react';
import { withParentSize } from '@visx/responsive';
import { AreaClosed, Line, LinePath } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import { curveNatural } from '@visx/curve';
import { GridColumns } from '@visx/grid';
import { Group } from '@visx/group';
import { Text } from '@visx/text';
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from '@visx/responsive/lib/enhancers/withParentSize';
import { useTimeValueScales } from '../../../hooks/ChartHooks';
import { ContributionDatum, PerformanceDatum } from './performanceData';
import {
  getPerformanceSimplifiedChartBottomAxisLabel,
  PerformanceChartAxisLeft,
} from './PerformanceChartAxes';
import { timeSeriesDateAccessor, timeSeriesValueAccessor } from '../../../utils/chart/accessors';
import getTimeSeriesMinMax from '../../../utils/chart/getTimeSeriesMinMax';
import { TypedReactMemo } from '../../../utils/common';
import PerformanceSimplifiedChartAxisBottom from './PerformanceChartAxes/PerformanceSimplifiedChartAxisBottom';
import { PerformanceDataPeriod } from '../../../services/performance/constants';
import useChartStyles from '../../../hooks/ChartHooks/useChartStyles';
import { usePerformanceSimplifiedChartDimension } from './performanceChartDimension/usePerformanceChartDimension';

export interface PerformanceSimplifiedChartProps
  extends WithParentSizeProps,
    WithParentSizeProvidedProps {
  performanceData: PerformanceDatum[];
  contributionsData: ContributionDatum[];
  dataPeriod: PerformanceDataPeriod;
}

// ---------- Utilities ---------- //

const MemoizedAreaClosed = TypedReactMemo(AreaClosed);
const MemoizedLinePath = TypedReactMemo(LinePath);

const MemoizedGridColumns = React.memo(GridColumns);

// ---------- Components ---------- //

function PerformanceSimplifiedChart({
  performanceData,
  contributionsData,
  dataPeriod,
  parentWidth = 0,
}: PerformanceSimplifiedChartProps) {
  // ----- Stylings ----- //

  const chartStyles = useChartStyles();

  // ----- Chart data ----- //

  const hasData = performanceData.length > 0 && contributionsData.length > 0;

  // ----- Chart scales & bounds ----- //

  const chartDimension = usePerformanceSimplifiedChartDimension(parentWidth);

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

  const { xScale, yScale } = useTimeValueScales({
    chartDimension,
    minDate: new Date(minChartDate),
    maxDate: new Date(maxChartDate),
    maxValue: maxChartValue,
    minValue: minChartValue,
    minValueBuffer: 0,
  });

  // ----- Chart accessor ----- //

  const shapeXAccessor = React.useCallback((d) => xScale(timeSeriesDateAccessor(d)) ?? 0, [xScale]);
  const shapeYAccessor = React.useCallback((d) => yScale(timeSeriesValueAccessor(d)) ?? 0, [
    yScale,
  ]);

  return (
    <svg
      data-testid="performance-simplified-chart-svg"
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

        <PerformanceChartAxisLeft chartDimension={chartDimension} scale={yScale} numTicks={2} />
        <PerformanceSimplifiedChartAxisBottom
          chartDimension={chartDimension}
          scale={xScale}
          hideAxisLine={false}
          stroke={chartStyles.STROKE_COLOR.GRID}
          strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
        />

        {/* There are always 2 static tick labels. One for "TODAY" and one for
            "X months/years ago". */}
        <Text
          x={chartDimension.margin.left + chartDimension.innerWidth}
          dx={-70}
          y={chartDimension.margin.top + chartDimension.innerHeight}
          dy={12}
          fill={chartStyles.TEXT_COLOR.AXES}
          fontSize={chartStyles.TEXT_SIZE.AXES}
          fontFamily={chartStyles.TEXT_FONT.COMMON}
          style={{ fontWeight: 'bold' }}
        >
          TODAY
        </Text>
        <Text
          x={chartDimension.margin.left}
          y={chartDimension.margin.top + chartDimension.innerHeight}
          dy={12}
          fill={chartStyles.TEXT_COLOR.AXES}
          fontSize={chartStyles.TEXT_SIZE.AXES}
          fontFamily={chartStyles.TEXT_FONT.COMMON}
          style={{ fontWeight: 'bold' }}
        >
          {getPerformanceSimplifiedChartBottomAxisLabel(dataPeriod)}
        </Text>

        {/* ***** Graph paths ***** */}

        {hasData && (
          <Group>
            {/* The performance graph has 2 components: an AreaClosed and a
              LinePath. The AreaClosed is used purely to create the gradient
              shading. We can't use AreaClosed with stroke because then there
              will be strokes along the chart's 2 sides and bottom, which we
              don't want. */}
            <MemoizedAreaClosed<PerformanceDatum>
              data={performanceData}
              x={shapeXAccessor}
              y={shapeYAccessor}
              yScale={yScale}
              curve={curveNatural}
              strokeWidth={0}
              fill="url(#historical-performance-gradient)"
            />
            <MemoizedLinePath<PerformanceDatum>
              data={performanceData}
              x={shapeXAccessor}
              y={shapeYAccessor}
              curve={curveNatural}
              stroke={chartStyles.STROKE_COLOR.PERFORMANCE_GRAPH}
              strokeWidth={chartStyles.STROKE_WIDTH.PERFORMANCE_GRAPH}
            />

            {/* This is the contribution graph */}
            <MemoizedLinePath<ContributionDatum>
              data={contributionsData}
              x={shapeXAccessor}
              y={shapeYAccessor}
              stroke={chartStyles.STROKE_COLOR.CONTRIBUTION_GRAPH}
              strokeWidth={chartStyles.STROKE_WIDTH.CONTRIBUTION_GRAPH}
              strokeDasharray={chartStyles.STROKE_DASHARRAY.CONTRIBUTION_GRAPH}
            />
          </Group>
        )}

        {/* ***** Grids ***** */}

        {/* These are vertical grids inside the chart's axes */}
        <MemoizedGridColumns
          scale={xScale}
          left={chartDimension.margin.left}
          top={chartDimension.margin.top}
          width={chartDimension.innerWidth - chartDimension.margin.left}
          height={chartDimension.innerHeight - chartDimension.margin.top}
          numTicks={2}
          stroke={chartStyles.STROKE_COLOR.GRID}
          strokeWidth={chartStyles.STROKE_WIDTH.GRID}
          strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
          strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
          pointerEvents="none"
        />

        {/* The left boundary */}
        <Line
          from={{
            x: chartDimension.margin.left,
            y: chartDimension.margin.top,
          }}
          to={{ x: chartDimension.margin.left, y: chartDimension.innerHeight }}
          stroke={chartStyles.STROKE_COLOR.GRID}
          strokeWidth={chartStyles.STROKE_WIDTH.GRID}
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
          strokeWidth={chartStyles.STROKE_WIDTH.GRID}
          strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
        />
      </Group>
    </svg>
  );
}

export default withParentSize<PerformanceSimplifiedChartProps>(PerformanceSimplifiedChart);
