import React from 'react';
import styled from 'styled-components';
import { Theme, Icon } from '../../atoms';

export const StyledBox = styled.div`
  ${({ breakTime }: { breakTime: boolean }) => `
    display: ${breakTime ? 'block' : 'inline-flex'};
    align-items: center;
    text-align: right;
    > div {
        display: inline-flex;
        align-items: center;
    }
  `}
`;

export const StyledIcon = styled(({ isExpiring, ...props }) => <Icon {...props} />)`
  ${({
    theme: {
      palette,
      spacing,
      typography: { pxToRem },
    },
    isExpiring,
  }: {
    theme: Theme;
    isExpiring: boolean;
  }) => `
    margin-left: ${pxToRem(spacing(1))};
    margin-right: ${pxToRem(spacing(1))};
    vertical-align: top;
    color: ${isExpiring ? palette.success.main : palette.error.main};
  `}
`;
