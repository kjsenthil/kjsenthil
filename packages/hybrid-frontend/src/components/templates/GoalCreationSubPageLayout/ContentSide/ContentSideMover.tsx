import * as React from 'react';
import { useBreakpoint } from '@tswdts/react-components';
import { ContentSideMoverContainer } from './ContentSide.styles';

interface ContentSideMoverProps {
  offsetY: number;
  children?: React.ReactNode;
}

// Mobile: either on top or at bottom
// Desktop: on the right
const ContentSideMover = React.forwardRef(({ offsetY, children }: ContentSideMoverProps, ref) => {
  const { isMobile } = useBreakpoint();

  return (
    <ContentSideMoverContainer
      ref={ref as React.RefObject<HTMLDivElement>}
      offsetY={offsetY}
      isMobile={isMobile}
    >
      {children}
    </ContentSideMoverContainer>
  );
});

export default ContentSideMover;
