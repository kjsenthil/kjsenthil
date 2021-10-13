import * as React from 'react';
import { ToggleButtonProps, Typography } from '../../../atoms';
import {
  StyledToggleButton,
  ToggleGroupButtonContentContainer,
  StyledToggleButtonPaddingSize,
  ToggleGroupButtonPromptContainerTriangle,
} from './ToggleGroupButton.styles';

export interface ToggleGroupButtonProps extends Omit<ToggleButtonProps, 'children' | 'color'> {
  // If provided, there will be a number appearing on the left-hand side of the
  // toggle button
  idNumber?: number;

  // Larger padding will make the button larger
  paddingSize?: StyledToggleButtonPaddingSize;

  // If true, will show the text bubble triangle below the button when the
  // button is selected.
  hasPrompt?: boolean;

  // What's inside the button. If a string is provided, will automatically wrap
  // it inside a <Typography>.
  content: string | React.ReactNode;

  // If true, will center button text (only works if content is 'string')
  centerText?: boolean;

  // Set a width for the button. Useful when you want all buttons to be of the
  // same size, for example.
  buttonWidth?: number;
}

export default function ToggleGroupButton({
  idNumber,
  paddingSize = 'large',
  hasPrompt,
  content,
  centerText,
  buttonWidth,
  selected,
  ...toggleButtonProps
}: ToggleGroupButtonProps) {
  const hasIdNumber = idNumber !== undefined;

  return (
    <StyledToggleButton
      paddingSize={paddingSize}
      selected={selected}
      buttonWidth={buttonWidth}
      {...toggleButtonProps}
    >
      <ToggleGroupButtonContentContainer hasIdNumber={hasIdNumber}>
        {hasIdNumber && (
          <Typography
            variant="h5"
            align="left"
            color={selected ? 'white' : 'primary'}
            colorShade="main"
          >
            {idNumber}
          </Typography>
        )}
        {typeof content === 'string' ? (
          <Typography
            variant="sh3"
            align={centerText ? 'center' : 'left'}
            color={selected ? 'white' : 'primary'}
            colorShade="dark2"
          >
            {content}
          </Typography>
        ) : (
          <div>{content}</div>
        )}

        {/* Display a triangle for the prompt text bubble. This is put here
            rather than within the ToggleGroupButtonPromptContainer because
            it's the easiest way to center the triangle on the middle of the
            button.
         */}
        {hasPrompt && selected && <ToggleGroupButtonPromptContainerTriangle />}
      </ToggleGroupButtonContentContainer>
    </StyledToggleButton>
  );
}
