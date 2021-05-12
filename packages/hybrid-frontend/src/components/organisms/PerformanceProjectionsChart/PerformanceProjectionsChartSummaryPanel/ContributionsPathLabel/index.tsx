import * as React from 'react';
import styled from 'styled-components';
import { PathLabelSquare } from '../LabelCommon';

const Container = styled.div`
  display: flex;
  gap: 1px;
`;

export default function ContributionsPathLabel() {
  return (
    <Container>
      <PathLabelSquare color="grey" colorOptions="main" />
      <PathLabelSquare color="grey" colorOptions="main" />
      <PathLabelSquare color="grey" colorOptions="main" />
    </Container>
  );
}
