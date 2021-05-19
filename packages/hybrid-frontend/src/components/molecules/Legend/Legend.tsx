import * as React from 'react';
import { LegendContainer, ValueContainer } from './Legend.styles';
import TagBox from '../TagBox';
import {
  Spacer,
  Typography,
  TypographyProps,
  ChartIndicator,
  ChartIndicatorProps,
} from '../../atoms';

export interface LegendProps {
  title: string;
  value?: string | number | Array<number>;
  valueSizeVariant?: TypographyProps['variant'];
  percentageChange?: number;
  chartIndicatorProps?: ChartIndicatorProps;
  valueFormatter?: (num: number) => string;
  percentageFormatter?: (num: number) => string;
}

const LegendValue = ({
  value,
  valueSizeVariant = 'sh4',
  valueFormatter,
  percentageFormatter,
  percentageChange,
}: Omit<LegendProps, 'title' | 'chartIndicatorProps' | 'value'> & {
  value: LegendProps['value'];
}) => {
  const values = Array.isArray(value) ? value.slice(0, 2) : [value];
  const legendValue = values
    .map((val) => (valueFormatter ? valueFormatter(Number(val)) : val))
    .join(' - ');

  return (
    <>
      <ValueContainer>
        <Typography variant={valueSizeVariant} color="primary" colorShade="dark2">
          {legendValue}
        </Typography>
        {percentageChange && (
          <>
            <Spacer x={1} />
            <TagBox variant="percentage" formatter={percentageFormatter}>
              {percentageChange}
            </TagBox>
          </>
        )}
      </ValueContainer>
    </>
  );
};

const Legend = ({ title, chartIndicatorProps, ...props }: LegendProps) => (
  <LegendContainer>
    {chartIndicatorProps && <ChartIndicator {...chartIndicatorProps} />}
    <div>
      <Typography variant="sh4" color="grey" colorShade="dark1">
        {title.toUpperCase()}
      </Typography>
      {typeof props.value !== 'undefined' && <LegendValue {...props} value={props.value} />}
    </div>
  </LegendContainer>
);

export default Legend;
