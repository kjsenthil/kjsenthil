import { Theme } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Icon } from '../../atoms';

export const StyledIcon = styled(Icon)`
  height: 24px;
  width: 24px;
`;

export const PopoverContainer = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    ::before {
      content: '';
      right: 25%;
      top: -5%;
      position: absolute;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid ${theme.palette.background.paper};
    }
  `}
`;
