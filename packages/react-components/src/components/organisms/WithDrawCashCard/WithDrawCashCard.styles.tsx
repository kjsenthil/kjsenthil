import * as React from 'react';
import styled, { css } from 'styled-components';
import { Button, Card } from '../../atoms';

interface StyleProps {
  canTransferCash?: boolean;
}

export const StyledMainCard = styled(({ isMobile, ...props }) => <Card {...props} />)`
  ${({ theme, isMobile }) => `
    padding: ${isMobile ? `${theme.spacing(2.5)}px` : `${theme.spacing(5)}px`};
    border-radius: ${theme.spacing(2)}px;
    box-shadow: none;
    border: 1px solid ${theme.palette.grey['200']};
  `}
`;

export const StyledButton = styled(({ canTransferCash, ...props }) => <Button {...props} />)`
  ${({ canTransferCash }: StyleProps) => css`
    display: ${canTransferCash ? 'block' : 'none'};
  `}
`;
