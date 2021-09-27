import * as React from 'react';
import { ToggleButtonProps, Typography } from '../../atoms';
import {
  DescriptiveToggleButton as StyledToggleButton,
  DescriptiveToggleButtonContentContainer,
} from './DescriptiveToggleButton.styles';

export interface DescriptiveToggleButtonProps
  extends Omit<ToggleButtonProps, 'children' | 'color'> {
  idNumber: number; // The number appearing on the left-hand side of the toggle button
  content: string | React.ReactNode;
}

export default function DescriptiveToggleButton({
  idNumber,
  content,
  selected,
  ...toggleButtonProps
}: DescriptiveToggleButtonProps) {
  return (
    <StyledToggleButton selected={selected} {...toggleButtonProps}>
      <DescriptiveToggleButtonContentContainer>
        <Typography
          variant="h5"
          align="left"
          color={selected ? 'white' : 'primary'}
          colorShade="main"
        >
          {idNumber}
        </Typography>
        {typeof content === 'string' ? (
          <Typography
            variant="sh3"
            align="left"
            color={selected ? 'white' : 'primary'}
            colorShade="dark2"
          >
            {content}
          </Typography>
        ) : (
          <div>{content}</div>
        )}
      </DescriptiveToggleButtonContentContainer>
    </StyledToggleButton>
  );
}
