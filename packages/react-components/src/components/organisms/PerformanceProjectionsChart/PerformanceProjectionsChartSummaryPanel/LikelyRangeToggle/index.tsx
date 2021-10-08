import * as React from 'react';
import { Typography } from '../../../../atoms';
import { LikelyRangeToggleContainer } from './LikelyRangeToggle.styles';
import LikelyRangeToggleBox from './LikelyRangeToggleBox';
import { useBreakpoint } from '../../../../../hooks';

export interface LikelyRangeToggleProps {
  showLikelyRange: boolean;
  toggleLikelyRange: () => void;
}

export default function LikelyRangeToggle({
  showLikelyRange,
  toggleLikelyRange,
}: LikelyRangeToggleProps) {
  const { isMobile } = useBreakpoint();

  const handleToggleClick = () => {
    toggleLikelyRange();
  };

  return (
    <LikelyRangeToggleContainer isMobile={isMobile}>
      <Typography variant="sh5" color="grey" colorShade="dark1">
        LIKELY RANGE
      </Typography>

      <LikelyRangeToggleBox
        checked={showLikelyRange}
        checkedText="Show"
        uncheckedText="Hide"
        onClick={handleToggleClick}
      />
    </LikelyRangeToggleContainer>
  );
}
