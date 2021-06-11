import React from 'react';
import { Box, BoxProps, Theme, useTheme } from '@material-ui/core';
import styled from 'styled-components';

const Divider = styled.div`
  ${({ theme, isVertical }: { theme: Theme; isVertical: boolean }) => `
      background-color: ${theme.palette.grey[100]};
      width: ${isVertical ? '2px' : '100%'};
      height: ${isVertical ? '100%' : '2px'};
      border-radius: 1.5px;
   `}
`;

export type SpacerProps = BoxProps & {
  x?: number;
  y?: number;
  basis?: number;

  // Setting this to true will apply a default width, border radius, and
  // background color to the Box
  asDivider?: boolean;

  // Setting this to true will change the display to 'inline-flex' rather than
  // the default 'flex'.
  inline?: boolean;
};

const Spacer = ({ x, y, basis, asDivider, inline, ...restProps }: SpacerProps) => {
  const theme = useTheme();

  return (
    <Box
      data-testid="Spacer"
      width={x ? theme.spacing(x) : undefined}
      height={y ? theme.spacing(y) : undefined}
      flexBasis={basis ? theme.spacing(basis) : undefined}
      flexGrow={0}
      flexShrink={0}
      {...restProps}
      display={inline ? 'inline-flex' : 'flex'}
      justifyContent="center"
      alignItems="center"
    >
      {asDivider && <Divider isVertical={typeof x === 'number'} />}
    </Box>
  );
};

export default Spacer;
