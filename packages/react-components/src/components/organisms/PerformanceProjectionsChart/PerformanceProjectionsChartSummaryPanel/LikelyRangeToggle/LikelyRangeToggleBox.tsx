import * as React from 'react';
import { Typography } from '../../../../atoms';
import {
  ElementsContainer,
  LikelyRangeToggleBoxContainer,
  SlidingBox,
  TextContainer,
} from './LikelyRangeToggleBox.styles';

export interface LikelyRangeToggleBoxProps extends React.ComponentPropsWithoutRef<'button'> {
  checked: boolean;

  checkedText: string;
  uncheckedText: string;
}

export default function LikelyRangeToggleBox({
  checked,
  checkedText,
  uncheckedText,
  ...rest
}: LikelyRangeToggleBoxProps) {
  return (
    <LikelyRangeToggleBoxContainer role="switch" aria-checked={checked} {...rest}>
      <ElementsContainer>
        <SlidingBox isLeft={checked} />

        <TextContainer>
          <Typography variant="sh3" color="primary">
            {checkedText}
          </Typography>
        </TextContainer>
        <TextContainer>
          <Typography variant="sh3" color="primary">
            {uncheckedText}
          </Typography>
        </TextContainer>
      </ElementsContainer>
    </LikelyRangeToggleBoxContainer>
  );
}
