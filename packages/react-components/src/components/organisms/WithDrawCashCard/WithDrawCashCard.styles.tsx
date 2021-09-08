import * as React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../../atoms';
import { MainCard } from '../../molecules';

interface StyleProps {
  canTransferCash?: boolean;
}

export const StyledMainCard = styled(MainCard)`
  &.MuiCard-root {
    padding: 20px;
  }
`;

export const StyledButton = styled(({ canTransferCash, ...props }) => <Button {...props} />)`
  ${({ canTransferCash }: StyleProps) => css`
    display: ${canTransferCash ? 'block' : 'none'};
  `}
`;
