import * as React from 'react';
import { Typography } from '@tsw/react-components';
import { EqualSignContainer } from './CommonSubPage.styles';

export default function EqualSign() {
  return (
    <EqualSignContainer>
      <Typography variant="h4" color="grey" component="div">
        =
      </Typography>
    </EqualSignContainer>
  );
}
