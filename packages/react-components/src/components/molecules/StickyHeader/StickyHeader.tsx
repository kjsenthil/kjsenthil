import React, { ReactNode } from 'react';
import { Box, Toolbar } from '../../atoms';
import StyledStickyAppBar from './StickyHeader.styles';

export interface StickyHeaderProps {
  children: ReactNode;
}

const StickyHeader = ({ children, ...props }: StickyHeaderProps) => (
  <StyledStickyAppBar
    position="sticky"
    color="inherit"
    elevation={0}
    data-test-id="sticky-header-menu"
    {...props}
  >
    <Box m={1}>
      <Toolbar>{children}</Toolbar>
    </Box>
  </StyledStickyAppBar>
);

export default StickyHeader;
