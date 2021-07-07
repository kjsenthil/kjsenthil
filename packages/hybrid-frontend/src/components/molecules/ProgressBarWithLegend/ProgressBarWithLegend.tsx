import * as React from 'react';
import { ProgressBar, Spacer } from '../../atoms';
import { ProgressLegendContainer, ProgressLegendWrapper } from './ProgressBarWithLegend.styles';
import Legend, { LegendProps } from '../Legend';

interface ProgressBarData {
  progress: number;
  legendProps: Pick<LegendProps, 'title' | 'value'>;
}

export interface ProgressBarWithLegendProps {
  currencyFormatter: (num: number) => string;
  progressBarData: Array<ProgressBarData>;
}

export default function ProgressBarWithLegend({
  currencyFormatter,
  progressBarData,
}: ProgressBarWithLegendProps) {
  const progress = progressBarData.map((data) => data.progress);

  return (
    <>
      <ProgressBar height={38} borderRadius={6} progress={progress} />
      <Spacer y={2} />
      <ProgressLegendContainer>
        {progressBarData.map((data) => {
          const width = data.progress * 100;
          return (
            <ProgressLegendWrapper
              width={width}
              key={`${data.progress}-${data.legendProps.title}-${data.legendProps.value}`}
            >
              <Legend {...data.legendProps} valueFormatter={currencyFormatter} />
            </ProgressLegendWrapper>
          );
        })}
      </ProgressLegendContainer>
    </>
  );
}
