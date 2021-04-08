import React from 'react';
import styled from 'styled-components';
import { Button, Paper } from '../../atoms';

export const ELEVATION = 3;

export const SelectButton = styled(Button)`
  width: 100%;
`;

export const GoalBox = styled(({ isSelected, ...props }) => <Paper {...props} />)`
  padding: 2rem;
  text-align: center;
  cursor: ${(props) => (props.isSelected ? 'default' : 'pointer')};
  margin: 0 10px;
`;
