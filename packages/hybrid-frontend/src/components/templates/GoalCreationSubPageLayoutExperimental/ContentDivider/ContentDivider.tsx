import * as React from 'react';
import { useGoalCreationLayoutIsMobile } from '../../GoalCreationLayoutExperimental';
import { DividerContainer, DividerLine, DividerTriangle } from './ContentDivider.styles';

interface ContentDividerProps {
  offsetY: number;
}

// Mobile: hidden
// Desktop: in the middle
export default function ContentDivider({ offsetY }: ContentDividerProps) {
  const isMobile = useGoalCreationLayoutIsMobile();

  return !isMobile ? (
    <DividerContainer>
      <DividerLine />
      <DividerTriangle offsetY={offsetY} />
    </DividerContainer>
  ) : null;
}
