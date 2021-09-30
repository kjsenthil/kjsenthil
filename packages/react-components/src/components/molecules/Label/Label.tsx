import * as React from 'react';
import StyledLabel from './Label.styles';
import { Typography } from '../../atoms';

export interface LabelProps {
  text: string;
  color:
    | 'background'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'grey'
    | 'gold'
    | 'success'
    | 'error'
    | 'text';
  colorShade?: string;
}

const Label = ({ text, color, colorShade = 'main' }: LabelProps) => (
  <StyledLabel bgColor={color} bgColorShade={colorShade}>
    <Typography variant="sh4" color="white">
      {text}
    </Typography>
  </StyledLabel>
);

export default Label;
