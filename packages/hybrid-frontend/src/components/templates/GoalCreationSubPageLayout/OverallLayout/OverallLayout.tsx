import * as React from 'react';
import { useBreakpoint } from '../../../../hooks';
import { OverallLayoutContainer } from './OverallLayout.styles';

interface OverallLayoutProps {
  sideContentFirstOnMobile: boolean;
  children?: React.ReactNode[];
}

const OverallLayout = React.forwardRef(
  ({ sideContentFirstOnMobile, children }: OverallLayoutProps, ref) => {
    const { isMobile } = useBreakpoint();

    return (
      <OverallLayoutContainer
        ref={ref as () => React.MutableRefObject<unknown>}
        sideContentFirstOnMobile={sideContentFirstOnMobile}
        isMobile={isMobile}
      >
        {children}
      </OverallLayoutContainer>
    );
  }
);

export default OverallLayout;
