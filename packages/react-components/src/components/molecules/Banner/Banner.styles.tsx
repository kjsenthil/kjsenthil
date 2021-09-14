import React from 'react';
import styled from 'styled-components';
import { Button, Typography } from '../../atoms';

export const StyledBanner = styled.aside`
  ${({ theme }) => `
    background-color: ${theme.palette.grey['100']};
    padding: ${theme.spacing(2)}px;
    border-radius: 0 ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px 0;
    border: 1px solid ${theme.palette.grey['200']};
    border-left: ${theme.spacing(0.5)}px solid ${theme.palette.primary.main};
  `}
`;

export const StyledButton = styled(Button)`
  max-width: 383px;
  background-color: white;
`;

export const StyledText = styled(({ isMobile, ...props }) => <Typography {...props} />)`
  ${({ theme, isMobile }) => `
    padding-top: ${theme.spacing(1)}px;
    padding-bottom: ${isMobile ? `${theme.spacing(2.2)}px` : 'none'};
  `}
`;
