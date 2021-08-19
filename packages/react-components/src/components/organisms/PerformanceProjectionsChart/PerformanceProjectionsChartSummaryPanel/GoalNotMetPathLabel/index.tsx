import styled from 'styled-components';
import * as React from 'react';
import { PathLabelSquare } from '../LabelCommon';

const Container = styled.div`
  display: flex;
  gap: 1px;
`;

export default function GoalNotMetPathLabel() {
  return (
    <Container>
      <PathLabelSquare color="gold" colorOptions="main" />
      <PathLabelSquare color="gold" colorOptions="main" />
      <PathLabelSquare color="gold" colorOptions="main" />
    </Container>
  );
}
