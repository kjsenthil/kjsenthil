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
  animationDuration?: number;
  isAnimationLinear?: boolean;
  // This allows parent components to override bar background colours, if
  // necessary
  barBackgrounds?: string[];
}

export default function ProgressBar({
  borderRadius = 4,
  height = 8,
  progress,
  animationDuration,
  barBackgrounds: barBackgroundsFromProps,
  isAnimationLinear,
}: ProgressBarProps) {
  const isMultiValue = Array.isArray(progress);

  // reluctantly casting to reassure TypeScript compiler
  const progressValueNow = isMultiValue
    ? (progress as number[]).reduce((a, b) => a + b, 0) * 100
    : (progress as number) * 100;

  const renderProgressBars = () => {
    const theme = useTheme();
    let defaultColor = `linear-gradient(to left, ${theme.palette.tertiary.light1}, ${theme.palette.tertiary.main} 50%)`;

    const barBackgroundColors = barBackgroundsFromProps ?? [];
    defaultColor =
      barBackgroundColors[0] ??
      `linear-gradient(to left, ${theme.palette.tertiary.light1}, ${theme.palette.tertiary.main} 50%)`;

    const progressFillProps = {
      borderRadius,
      animationDuration,
      isAnimationLinear,
      barHeight: height,
    };
    if (isMultiValue) {
      const barBackgrounds = barBackgroundsFromProps ?? [
        theme.palette.tertiary.dark1,
        defaultColor,
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
            index < barBackgroundsLength ? barBackgrounds[index] : defaultColor;

          return (
            <ProgressBarFill
              barBackground={selectedBackground}
              // eslint-disable-next-line react/no-array-index-key
              key={`${totalWidth}${index}`}
              barWidth={totalWidth}
              {...progressFillProps}
            />
          );
        })
        .reverse();
    }

    return (
      <ProgressBarFill
        barBackground={defaultColor}
        barWidth={(progress as number) * 100}
        {...progressFillProps}
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
