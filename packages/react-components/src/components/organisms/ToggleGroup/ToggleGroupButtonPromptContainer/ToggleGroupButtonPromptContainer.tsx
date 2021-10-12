import * as React from 'react';
import { ToggleGroupButtonPromptContainerBubble } from './ToggleGroupButtonPromptContainer.styles';

export interface ToggleGroupButtonPromptContainerProps {
  children?: React.ReactNode;
}

export default function ToggleGroupButtonPromptContainer({
  children,
}: ToggleGroupButtonPromptContainerProps) {
  return (
    <ToggleGroupButtonPromptContainerBubble>{children}</ToggleGroupButtonPromptContainerBubble>
  );
}
