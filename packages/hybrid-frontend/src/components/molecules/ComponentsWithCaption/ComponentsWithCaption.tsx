import React from 'react';
import styled from 'styled-components';
import { Theme, Typography } from '../../atoms';

const ChildrenContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    column-gap: ${theme.spacing(3)}px;
  `}
`;

const ComponentsWithCaptionStyle = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: grid;
    row-gap: ${theme.spacing(0.5)}px;
  `}
`;

export interface ComponentsWithCaptionProps {
  children: React.ReactNode;
  caption: string;
}

const ComponentsWithCaption: React.FC<ComponentsWithCaptionProps> = ({ children, caption }) => (
  <ComponentsWithCaptionStyle>
    <ChildrenContainer>{children}</ChildrenContainer>
    <Typography color="primary" colorShade="dark2">
      {caption}
    </Typography>
  </ComponentsWithCaptionStyle>
);

export default ComponentsWithCaption;
