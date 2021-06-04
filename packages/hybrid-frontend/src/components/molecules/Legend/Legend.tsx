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
import { Counter, CounterProps } from '../../particles';

type Formatter = (num: number) => string;

type Value = string | number | Array<number>;

export interface LegendProps {
  title: string;
  value?: Value;
  valueSizeVariant?: TypographyProps['variant'];
  percentageChange?: number;
  chartIndicatorProps?: ChartIndicatorProps;
  valueFormatter?: Formatter;
  percentageFormatter?: Formatter;
  shouldAnimate?: boolean;
  counterProps?: Omit<CounterProps, 'valueFormatter' | 'value'>;
}

const LegendValue = ({
  value,
  valueSizeVariant = 'sh4',
  valueFormatter,
  percentageFormatter,
  percentageChange,
  shouldAnimate = false,
  counterProps = {},
}: Omit<LegendProps, 'title' | 'chartIndicatorProps' | 'value'> & {
  value: Value;
}) => {
  const renderWithCounter = (
    val: string | number,
    formatter: Formatter = (num: number) => String(num)
  ) =>
    /* eslint-disable no-nested-ternary */
    shouldAnimate && typeof val === 'number' ? (
      <Counter
        {...counterProps}
        valueFormatter={(num) => formatter(Number(num))}
        value={Number(val)}
      />
    ) : typeof val === 'number' ? (
      formatter(val)
    ) : (
      val
    );

  const legendValue = Array.isArray(value) ? (
    <>
      {renderWithCounter(value[0], valueFormatter)}
      {' - '}
      {renderWithCounter(value[1], valueFormatter)}
    </>
  ) : (
    renderWithCounter(value, valueFormatter)
  );

  return (
    <>
      <ValueContainer>
        <Typography variant={valueSizeVariant} color="primary" colorShade="dark2">
          {legendValue}
        </Typography>
        {percentageChange !== undefined && (
          <>
            <Spacer x={1} />
            <TagBox
              variant="percentage"
              formatter={percentageFormatter}
              shouldAnimate={shouldAnimate}
            >
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
