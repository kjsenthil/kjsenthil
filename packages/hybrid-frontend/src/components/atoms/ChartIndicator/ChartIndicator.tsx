import * as React from 'react';
import {
  DoubleSolidIndicatorContainer,
  DottedIndicatorContainer,
  IndicatorSquare,
  SolidIndicator,
  ColorShade,
  Color,
  GradientIndicator,
} from './ChartIndicator.styles';

export interface ChartIndicatorProps {
  variant: 'solid' | 'double-solid' | 'dotted' | 'gradient';
  colorShade?: ColorShade;
  color?: Color;
  secondaryColor?: Color;
  secondaryColorShade?: ColorShade;
}

const DottedIndicator = ({ colorShade, color }: { colorShade?: ColorShade; color?: Color }) => (
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
