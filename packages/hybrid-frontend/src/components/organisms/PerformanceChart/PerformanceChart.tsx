import * as React from 'react';
import { withParentSize } from '@visx/responsive';
import { AreaClosed, Bar, Circle, Line, LinePath } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import { GridRows } from '@visx/grid';
import { curveNatural } from '@visx/curve';
import { Group } from '@visx/group';
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from '@visx/responsive/lib/enhancers/withParentSize';
import styled from 'styled-components';
import { Theme } from '../../atoms';
import { useTimeValueScales } from '../../../hooks/ChartHooks';
import PerformanceChartTooltip from './PerformanceChartTooltip/PerformanceChartTooltip';
import usePerformanceChartTooltip from './PerformanceChartTooltip/usePerformanceChartTooltip';
import { ContributionDatum, PerformanceDatum } from './performanceData';
import { PerformanceChartAxisBottom, PerformanceChartAxisLeft } from './PerformanceChartAxes';
import PerformanceChartSummaryPanel from './PerformanceChartSummaryPanel/PerformanceChartSummaryPanel';
import { ChartPeriodSelection, ChartPeriodSelectionProps } from '../../molecules';
import { timeSeriesDateAccessor, timeSeriesValueAccessor } from '../../../utils/chart/accessors';
import getTimeSeriesMinMax from '../../../utils/chart/getTimeSeriesMinMax';
import useChartStyles from '../../../hooks/ChartHooks/useChartStyles';
import { usePerformanceChartDimension } from './performanceChartDimension/usePerformanceChartDimension';
import { d3TimeFormatter, D3TimeFormatterType } from '../../../utils/formatters';

export interface PerformanceChartProps extends WithParentSizeProps, WithParentSizeProvidedProps {
  performanceData: PerformanceDatum[];
  contributionsData: ContributionDatum[];
  periodSelectionProps: ChartPeriodSelectionProps;

  axisBottomConfig?: Record<string, { numTicks: number; tickFormatterType: D3TimeFormatterType }>;
}

// ---------- Utilities ---------- //

const MemoizedGridRows = React.memo(GridRows);

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
  performanceData,
  contributionsData,
  periodSelectionProps,
  axisBottomConfig,
  parentWidth = 0,
}: PerformanceChartProps) {
  // ----- Stylings ----- //

  const chartStyles = useChartStyles();

  // ----- Chart data ----- //

  const hasData = performanceData.length > 0 && contributionsData.length > 0;

  // ----- Chart scales & bounds ----- //

  const chartDimension = usePerformanceChartDimension(parentWidth);

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
  });

  // ----- Chart accessor ----- //

  const shapeXAccessor = React.useCallback((d) => xScale(timeSeriesDateAccessor(d)) ?? 0, [xScale]);
  const shapeYAccessor = React.useCallback((d) => yScale(timeSeriesValueAccessor(d)) ?? 0, [
    yScale,
  ]);

  // ----- Chart axis bottom ----- //

  const {
    numTicks: axisBottomNumTicks,
    tickFormatterType: axisBottomTickFormatterType,
  } = axisBottomConfig
    ? axisBottomConfig[periodSelectionProps.currentPeriod]
    : {
        numTicks: 4,
        tickFormatterType: D3TimeFormatterType.DATE_AND_MONTH,
      };

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

  // When the chart is not hovered on, we show the tooltip and indicator at the
  // last (latest) data point

  // When the chart is not hovered on, we show the tooltip and indicator at the
  // last (latest) data point

  let lastPerformanceDataPoint;
  let lastContributionsDataPoint;
  let defaultTooltipLeft = 0;
  let defaultTooltipTop = 0;
  let defaultTooltipData;

  if (hasData) {
    lastPerformanceDataPoint = performanceData[performanceData.length - 1];
    lastContributionsDataPoint = contributionsData[contributionsData.length - 1];

    defaultTooltipLeft = chartDimension.innerWidth;
    defaultTooltipTop = yScale(timeSeriesValueAccessor(lastPerformanceDataPoint));
    defaultTooltipData = {
      performance: lastPerformanceDataPoint,
      contribution: lastContributionsDataPoint,
      contributionIndicatorPosY: yScale(timeSeriesValueAccessor(lastContributionsDataPoint)),
    };
  }

  // ----- Summary panel ----- //

  let totalPerformance = 0;
  let totalContributions = 0;

  if (tooltipData) {
    totalPerformance = tooltipData.performance.value;
    totalContributions = tooltipData.contribution.value;
  } else if (hasData) {
    totalPerformance = lastPerformanceDataPoint.value;
    totalContributions = lastContributionsDataPoint.value;
  }

  const totalReturn = totalPerformance - totalContributions;
  const totalReturnPct =
    totalPerformance && totalContributions ? totalPerformance / totalContributions - 1 : 0;

  return (
    <Container>
      <ControlPanelContainer>
        <PerformanceChartSummaryPanel
          totalPerformance={totalPerformance}
          totalContributions={totalContributions}
          totalReturn={totalReturn}
          totalReturnPct={totalReturnPct}
        />
        <ChartPeriodSelection {...periodSelectionProps} />
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

        {/* Main chart */}

        <Group left={chartDimension.margin.left} top={chartDimension.margin.top}>
          {/* Axes */}

          <PerformanceChartAxisLeft chartDimension={chartDimension} scale={yScale} />
          <PerformanceChartAxisBottom
            chartDimension={chartDimension}
            scale={xScale}
            numTicks={axisBottomNumTicks}
            tickFormat={d3TimeFormatter[axisBottomTickFormatterType]}
          />

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
            </Group>
          )}

          {/* This is the chart's tooltip hover detection area */}
          <Bar
            x={chartDimension.margin.left}
            width={chartDimension.innerWidth - chartDimension.margin.left}
            height={chartDimension.innerHeight}
            fill="transparent"
            onTouchStart={handleShowContributionsTooltip}
            onTouchMove={handleShowContributionsTooltip}
            onMouseMove={handleShowContributionsTooltip}
            onMouseLeave={() => hideTooltip()}
          />

          {/* ***** Grids ***** */}

          <MemoizedGridRows
            scale={yScale}
            left={chartDimension.margin.left}
            width={chartDimension.innerWidth - chartDimension.margin.left}
            height={chartDimension.innerHeight}
            numTicks={4}
            stroke={chartStyles.STROKE_COLOR.GRID}
            strokeWidth={chartStyles.STROKE_WIDTH.GRID}
            strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
            strokeOpacity={chartStyles.STROKE_OPACITY.GRID}
            pointerEvents="none"
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
                  y: chartDimension.innerHeight - chartDimension.margin.top,
                }}
                stroke={chartStyles.STROKE_COLOR.INDICATOR}
                strokeWidth={chartStyles.STROKE_WIDTH.INDICATOR_LINE}
                pointerEvents="none"
              />
              <Circle
                cx={tooltipData ? tooltipLeft : defaultTooltipLeft}
                cy={tooltipData ? tooltipTop : defaultTooltipTop}
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
            </Group>
          )}

          {/* Tooltip */}

          {hasData && (
            <TooltipInPortal
              key={Math.random()}
              top={chartDimension.innerHeight + 6}
              left={tooltipOpen && tooltipData ? tooltipLeft : defaultTooltipLeft}
              style={tooltipStyles}
              offsetLeft={chartDimension.margin.left}
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
      </svg>
    </Container>
  );
}

export default withParentSize<PerformanceChartProps>(PerformanceChart);
