import * as React from 'react';
import { Typography } from '../../../../atoms';
import { LikelyRangeToggleContainer } from './LikelyRangeToggle.styles';
import LikelyRangeToggleBox from './LikelyRangeToggleBox';

export interface LikelyRangeToggleProps {
  showLikelyRange: boolean;
  toggleLikelyRange: () => void;
}

export default function LikelyRangeToggle({
  showLikelyRange,
  toggleLikelyRange,
}: LikelyRangeToggleProps) {
  const handleToggleClick = () => {
    toggleLikelyRange();
  };

  return (
    <LikelyRangeToggleContainer>
      <Typography variant="sh4" color="grey" colorShade="dark1">
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
