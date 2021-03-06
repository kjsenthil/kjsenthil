import * as React from 'react';
import { Line } from '@visx/shape';
import { useChartStyles } from '../../../hooks';

type ChartOuterBorderLineProps = React.ComponentProps<typeof Line>;

export default function ChartOuterBorderLine(props: ChartOuterBorderLineProps) {
  const chartStyles = useChartStyles();

  return (
    <Line
      {...props}
      stroke={chartStyles.STROKE_COLOR.OUTER_BORDER}
      strokeWidth={chartStyles.STROKE_WIDTH.OUTER_BORDER}
      strokeOpacity={chartStyles.STROKE_OPACITY.OUTER_BORDER}
    />
  );
}
