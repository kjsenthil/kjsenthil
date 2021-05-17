import * as React from 'react';
import {
  DoubleSolidIndicatorContainer,
  DottedIndicatorContainer,
  IndicatorSquare,
  SolidIndicator,
  ColorShades,
  Colors,
  GradientIndicator,
} from './ChartIndicator.styles';

export interface ChartIndicatorProps {
  variant: 'solid' | 'double-solid' | 'dotted' | 'gradient';
  colorShade?: ColorShades;
  color?: Colors;
  secondaryColor?: Colors;
  secondaryColorShade?: ColorShades;
}

const DottedIndicator = ({ colorShade, color }: { colorShade?: ColorShades; color?: Colors }) => (
  <DottedIndicatorContainer>
    {Array.from({ length: 3 }).map(() => (
      <IndicatorSquare color={color} colorShade={colorShade} />
    ))}
  </DottedIndicatorContainer>
);

const ChartIndicator = ({
  variant,
  colorShade,
  color,
  secondaryColor,
  secondaryColorShade,
}: ChartIndicatorProps) => {
  switch (variant) {
    case 'solid':
      return <SolidIndicator color={color} colorShade={colorShade} />;
    case 'double-solid':
      return (
        <DoubleSolidIndicatorContainer>
          <SolidIndicator color={color || 'primary'} colorShade={colorShade} />
          <SolidIndicator color={secondaryColor || 'tertiary'} colorShade={colorShade} />
        </DoubleSolidIndicatorContainer>
      );
    case 'dotted':
      return <DottedIndicator color={color} colorShade={colorShade} />;
    case 'gradient':
      return (
        <GradientIndicator color={color} topShade={colorShade} bottomShade={secondaryColorShade} />
      );
    default:
      return null;
  }
};

export default ChartIndicator;
