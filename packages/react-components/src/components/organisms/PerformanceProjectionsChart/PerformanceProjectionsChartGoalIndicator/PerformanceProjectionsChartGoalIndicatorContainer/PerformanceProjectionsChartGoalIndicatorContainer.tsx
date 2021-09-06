import * as React from 'react';
import {
  ContainerParent,
  ContainerBubble,
  ContainerTriangle,
} from './PerformanceProjectionsChartGoalIndicatorContainer.styles';

export interface PerformanceProjectionsChartGoalIndicatorContainerProps {
  top: number | undefined;
  left: number | undefined;
  children: React.ReactNode;
}

export default function PerformanceProjectionsChartGoalIndicatorContainer({
  top,
  left,
  children,
}: PerformanceProjectionsChartGoalIndicatorContainerProps) {
  return (
    <ContainerParent top={top} left={left}>
      <ContainerBubble>{children}</ContainerBubble>
      <ContainerTriangle />
    </ContainerParent>
  );
}
