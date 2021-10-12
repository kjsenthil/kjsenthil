import React from 'react';
import { ToggleButtonGroupProps } from '../../atoms';
import { ToggleGroupButtonProps } from './ToggleGroupButton';

// Description of the layouts:
// ---------------------------
// Can have prompts:
// - dynamic: buttons are aligned dynamically. A row can contain various amounts
//   of buttons. Not allowed to have prompts.
// - onePerRow: there is one button per row. Not allowed to have prompts.
//
// Can't have prompts:
// - oneRowOnly: all buttons will always be on one row. It's possible for
//   buttons to have prompts using this layout.
//
// Restrictions on which layout can or can't have prompt are based on design
// requirements and how easy it is to implement. Because the prompts are part
// of the page's layout (they push contents downwards), it's more difficult to
// have prompts when the rows are dynamically determined by screen size (we
// don't easily know which "row" to put the prompt in).
// As you can imagine, it'll be much easier if the prompts behave like a Modal,
// staying on top of all other page content. In this case, any layout can have
// prompts.
export type ToggleGroupLayout = 'dynamic' | 'onePerRow' | 'oneRowOnly';

// Extended by both ToggleGroupWithoutPromptsProps and ToggleGroupWithPromptsProps
export interface ToggleGroupCommonProps
  extends Omit<
    ToggleButtonGroupProps,
    'exclusive' | 'color' | 'value' | 'onChange' | 'orientation'
  > {
  selectedValue: string | null;
  setSelectedValue: (newSelectedValue: string | null) => void;

  // If true, buttons will be numbered
  ordered?: boolean;
}

export interface ToggleGroupWithoutPromptsProps extends ToggleGroupCommonProps {
  layout: 'dynamic' | 'onePerRow';
  values: string[];
}

export interface ValueWithPrompt {
  value: string;

  // Will be shown when its corresponding ToggleButton is clicked
  prompt: React.ReactNode;
}

// Essentially we can provide either a primitive string or a ValueWithPrompt
// object to tell the ToggleGroup to show a prompt when a ToggleButton is
// clicked.
export type ToggleGroupValueWithPrompt = string | ValueWithPrompt;

export interface ToggleGroupWithPromptsProps extends ToggleGroupCommonProps {
  layout: 'oneRowOnly';
  values: ToggleGroupValueWithPrompt[];

  // If true, children will have equal width expanding to their parents.
  // If a number is provided, the buttons will all have this width. Note: this
  // number will go into the MUI's theme.spacing() function, NOT a pixel width.
  // Useful when doing different kinds of layouts.
  equalWidthChildren?: boolean | number;

  toggleGroupButtonProps?: Omit<ToggleGroupButtonProps, 'idNumber' | 'content' | 'hasPrompt'>;
}
