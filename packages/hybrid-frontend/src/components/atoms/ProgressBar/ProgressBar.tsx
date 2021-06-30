import * as React from 'react';
import { useTheme } from '@material-ui/core';
import {
  ProgressBarContainer,
  ProgressBarFill,
  ProgressBarInnerBorder,
} from './ProgressBar.styles';

export interface ProgressBarProps {
  progress: number | number[];
  borderRadius?: number;
  height?: number;
}

export default function ProgressBar({ borderRadius = 4, height = 8, progress }: ProgressBarProps) {
  const isMultiValue = Array.isArray(progress);

  // reluct casting to reassure TypeScript compiler
  const progressValueNow = isMultiValue
    ? (progress as number[]).reduce((a, b) => a + b, 0) * 100
    : (progress as number) * 100;

  const renderProgressBars = () => {
    const theme = useTheme();
    const linearGradient = `linear-gradient(to left, ${theme.palette.tertiary.light1}, ${theme.palette.tertiary.main} 50%)`;

    if (isMultiValue) {
      const barBackgrounds = [
        theme.palette.tertiary.dark1,
        linearGradient,
        theme.palette.tertiary.light2,
      ];
      const barBackgroundsLength = barBackgrounds.length;

      let totalWidth = 0;

      // reluctantly casting to reassure TypeScript compiler
      return (progress as number[])
        .map((progressValue, index) => {
          const barWidth = progressValue * 100;
          totalWidth += barWidth;

          // fallback to a linear gradient fill
          const selectedBackground =
            index < barBackgroundsLength ? barBackgrounds[index] : linearGradient;

          return (
            <ProgressBarFill
              barBackground={selectedBackground}
              key={totalWidth}
              barHeight={height}
              barWidth={totalWidth}
              borderRadius={borderRadius}
            />
          );
        })
        .reverse();
    }

    return (
      <ProgressBarFill
        borderRadius={borderRadius}
        barBackground={linearGradient}
        barHeight={height}
        barWidth={(progress as number) * 100}
      />
    );
  };

  return (
    <ProgressBarContainer
      borderRadius={borderRadius}
      isMultiValue={isMultiValue}
      barHeight={height}
      role="progressbar"
      aria-valuenow={progressValueNow}
    >
      <ProgressBarInnerBorder borderRadius={borderRadius} isMultiValue={isMultiValue} />
      {renderProgressBars()}
    </ProgressBarContainer>
  );
}
