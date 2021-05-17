/* eslint-disable no-nested-ternary */

import React from 'react';
import { Box, BoxProps, useTheme } from '@material-ui/core';

export type SpacerProps = BoxProps & {
  x?: number;
  y?: number;
  basis?: number;

  // Setting this to true will apply a default width, border radius, and
  // background color to the Box
  asDivider?: boolean;
};

const Spacer = ({ x, y, basis, asDivider, ...restProps }: SpacerProps) => {
  const theme = useTheme();
  return (
    <Box
      data-testid="Spacer"
      width={x ? theme.spacing(x) : asDivider ? 3 : undefined}
      height={y ? theme.spacing(y) : undefined}
      flexBasis={basis ? theme.spacing(basis) : undefined}
      flexGrow={0}
      flexShrink={0}
      bgcolor={asDivider ? theme.palette.grey['100'] : undefined}
      borderRadius={asDivider ? 1.5 : undefined}
      {...restProps}
    />
  );
};

export default Spacer;
