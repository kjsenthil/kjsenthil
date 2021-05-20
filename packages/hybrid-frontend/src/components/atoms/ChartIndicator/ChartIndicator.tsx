import * as React from 'react';
import {
  DashedIndicatorContainer,
  IndicatorDash,
  SolidIndicator,
  ColorShade,
  Color,
  RectangleIndicator,
} from './ChartIndicator.styles';

export interface ChartIndicatorProps {
  variant: 'solid' | 'dashed-3' | 'dashed-4' | 'rectangle';
  colorShade?: ColorShade;
  color?: Color;
  secondaryColor?: Color;
  secondaryColorShade?: ColorShade;
}

/* eslint-disable react/no-array-index-key */
const DashedIndicator = ({
  colorShade,
  color,
  numOfDashes,
}: {
  colorShade?: ColorShade;
  numOfDashes: 3 | 4;
  color?: Color;
}) => (
  <DashedIndicatorContainer thick={numOfDashes === 3}>
    {Array.from({ length: numOfDashes }).map((_, i) => (
      /* eslint-disable-next-line react/no-array-index-key */
      <IndicatorDash key={i} color={color} colorShade={colorShade} />
    ))}
  </DashedIndicatorContainer>
);

const ChartIndicator = ({ variant, color, colorShade }: ChartIndicatorProps) => {
  switch (variant) {
    case 'solid':
      return <SolidIndicator color={color} colorShade={colorShade} />;

    case 'dashed-3':
      return <DashedIndicator numOfDashes={3} color={color} />;

    case 'dashed-4':
      return <DashedIndicator numOfDashes={4} color={color} />;

    case 'rectangle':
      return <RectangleIndicator color={color} colorShade={colorShade} />;
    default:
      return null;
  }
};

export default ChartIndicator;
