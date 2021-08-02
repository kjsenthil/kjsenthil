import * as React from 'react';
import { DividerContainer, DividerLine, DividerTriangle } from './ContentDivider.styles';
import { useBreakpoint } from '../../../../hooks';

interface ContentDividerProps {
  offsetY: number;
}

// Mobile: hidden
// Desktop: in the middle
export default function ContentDivider({ offsetY }: ContentDividerProps) {
  const isMobile = useBreakpoint();

  return !isMobile ? (
    <DividerContainer>
      <DividerLine />
      <DividerTriangle offsetY={offsetY} />
    </DividerContainer>
  ) : null;
}
