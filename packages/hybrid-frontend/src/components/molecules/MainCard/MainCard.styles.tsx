import React from 'react';
import styled from 'styled-components';
import { Card, Theme } from '../../atoms';

export const CardContainer = styled(({ isMobile, ...props }) => <Card {...props} />)`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) => `
    padding: ${theme.spacing(isMobile ? 3 : 5)}px;
    background-color:  ${theme.palette.background.paper};
    box-shadow: 1px 2px 44px 0 rgba(139,139,139,0.26);
    border-radius: 16px;
  `}
`;

export const ActionElementContainer = styled.div`
  max-width: 50%;
`;
