import * as React from 'react';
import { LegendContainer, IconWrapper } from './Legend.styles';
import TagBox from '../TagBox';
import {
  Spacer,
  Typography,
  TypographyProps,
  ChartIndicator,
  ChartIndicatorProps,
  Tooltip,
  Icon,
  Box,
  Grid,
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
  tooltip?: string;
  percentageNewLine?: boolean;
  spaceNoWrap?: boolean;
}

const LegendValue = ({
  value,
  valueSizeVariant = 'sh5',
  valueFormatter,
  percentageFormatter,
  percentageChange,
  shouldAnimate = false,
  counterProps = {},
  percentageNewLine = false,
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
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant={valueSizeVariant} color="primary" colorShade="dark2" spaceNoWrap>
          {legendValue}
        </Typography>
      </Grid>
      <Grid item xs={percentageNewLine ? 12 : 'auto'}>
        {percentageChange !== undefined && (
          <Box marginLeft={percentageNewLine ? 0 : 1}>
            <TagBox
              variant="percentage"
              formatter={percentageFormatter}
              shouldAnimate={shouldAnimate}
            >
              {percentageChange}
            </TagBox>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

const LegendTooltip = ({ tooltip }) => (
  <>
    <Spacer inline x={0.5} />
    <Tooltip title={tooltip}>
      <IconWrapper>
        <Icon
          name="infoCircleIcon"
          aria-label="more information"
          color="inherit"
          fontSize="inherit"
        />
      </IconWrapper>
    </Tooltip>
  </>
);

const Legend = ({
  title,
  chartIndicatorProps,
  tooltip,
  spaceNoWrap = true,
  ...props
}: LegendProps) => (
  <LegendContainer>
    {chartIndicatorProps && <ChartIndicator {...chartIndicatorProps} />}
    <div>
      <Typography variant="sh5" color="grey" colorShade="dark1" spaceNoWrap={spaceNoWrap}>
        {title.toUpperCase()}
        {tooltip && <LegendTooltip tooltip={tooltip} />}
      </Typography>
      <Spacer y={0.5} />
      {typeof props.value !== 'undefined' && <LegendValue {...props} value={props.value} />}
    </div>
  </LegendContainer>
);

export default Legend;
