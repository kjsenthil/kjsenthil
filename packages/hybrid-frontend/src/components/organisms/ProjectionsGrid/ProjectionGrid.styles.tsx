import React from 'react';
import styled from 'styled-components';
import { Paper, Typography } from '../../atoms';

export const ProjectionWidget = styled(({ topColor, ...props }) => (
  <Paper elevation={0} {...props} />
))`
  background-color: #f5f5f5;
  padding: 0.3rem;
  border-top: 1px solid ${({ topColor }) => topColor};
`;

export const ProjectionType = styled(Typography)`
  font-size: 0.8rem;
  color: #7a7a7a; // replace with theme palette when colors are determined
`;

export const ProjectionValue = styled(Typography)`
  font-size: 1rem;
  color: #4a4a4a; // replace with theme palette when colors are determined
`;
