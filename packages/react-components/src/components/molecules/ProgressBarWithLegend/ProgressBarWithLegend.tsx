import React, { FunctionComponent } from 'react';
import { ProgressBar, Spacer, Typography } from '../../atoms';
import {
  ProgressLegendContainer,
  ProgressLegendWrapper,
  TargetLegendContainer,
  TargetLegendWrapper,
} from './ProgressBarWithLegend.styles';
import Legend, { LegendProps } from '../Legend';

export type ProgressBarLegendValue = Pick<LegendProps, 'title' | 'value' | 'chartIndicatorProps'>;

export interface ProgressBarData {
  progress: number;
  legendProps: ProgressBarLegendValue;
}

export interface ProgressBarWithLegendProps {
  currencyFormatter: (num: number) => string;
  progressBarData: Array<ProgressBarData>;
  progressBarBackgrounds?: string[];
  height?: number;
  borderRadius?: number;
  groupLegendValues?: boolean;
  targetLegend?: {
    title: string;
    value: number; // Simplify formatting later on by restricting this to number, not Value
  };
}

interface TargetLegendProps {
  title: string;
  value: number;
  valueFormatter: (n: number) => string;
}

const TargetLegend: FunctionComponent<TargetLegendProps> = ({ title, value, valueFormatter }) => (
  <TargetLegendContainer>
    <Typography variant="sh4" color="primary" colorShade="dark2" spaceNoWrap>
      {title.toUpperCase()}
    </Typography>
    <Typography variant="sh3" color="primary" colorShade="dark2" spaceNoWrap>
      {valueFormatter(value)}
    </Typography>
  </TargetLegendContainer>
);

export default function ProgressBarWithLegend({
  currencyFormatter,
  progressBarData,
  progressBarBackgrounds,
  height = 38,
  borderRadius = 6,
  groupLegendValues = false,
  targetLegend,
}: ProgressBarWithLegendProps) {
  const progress = progressBarData.map((data) => data.progress);

  return (
    <>
      <ProgressBar
        height={height}
        borderRadius={borderRadius}
        progress={progress}
        barBackgrounds={progressBarBackgrounds}
      />
      <Spacer y={2} />
      <ProgressLegendContainer>
        {progressBarData
          .filter((data) => data.progress > 0)
          .map((data) => {
            const width = groupLegendValues ? undefined : data.progress * 100;
            return (
              <ProgressLegendWrapper
                key={`${data.progress}-${data.legendProps.title}-${data.legendProps.value}`}
                {...{ width }}
              >
                <Legend {...data.legendProps} valueFormatter={currencyFormatter} />
              </ProgressLegendWrapper>
            );
          })}
        {targetLegend && (
          <TargetLegendWrapper>
            <TargetLegend
              title={targetLegend.title}
              value={targetLegend.value}
              valueFormatter={currencyFormatter}
            />
          </TargetLegendWrapper>
        )}
      </ProgressLegendContainer>
    </>
  );
}
