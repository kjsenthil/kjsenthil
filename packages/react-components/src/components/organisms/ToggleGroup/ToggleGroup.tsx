import React from 'react';
import { ToggleButton } from '../../atoms';
import { ToggleGroupButton } from './ToggleGroupButton';
import { useBreakpoint } from '../../../hooks';
import {
  StyledUnorderedGroupContainer,
  StyledUnorderedToggleButtonGroup,
  ToggleButtonGroupOneButtonPerRow,
  ToggleButtonGroupOneRowOnly,
  ToggleButtonGroupOneRowOnlyContainer,
} from './ToggleGroup.styles';
import ToggleGroupButtonPromptContainer from './ToggleGroupButtonPromptContainer/ToggleGroupButtonPromptContainer';
import {
  ToggleGroupWithPromptsProps,
  ToggleGroupWithoutPromptsProps,
  ToggleGroupValueWithPrompt,
  ValueWithPrompt,
} from './types';

export type ToggleGroupProps = ToggleGroupWithoutPromptsProps | ToggleGroupWithPromptsProps;

// Custom type predicate to check whether the component is one that can or can't
// have prompts
function isCantHavePromptsLayout(props: ToggleGroupProps): props is ToggleGroupWithoutPromptsProps {
  return props.layout === 'dynamic' || props.layout === 'onePerRow';
}

// Custom type predicate to determine whether a value is a primitive string or
// a ValueWithPrompt
function isValueWithPrompt(
  toggleGroupValueWithPrompt: ToggleGroupValueWithPrompt
): toggleGroupValueWithPrompt is ValueWithPrompt {
  return (toggleGroupValueWithPrompt as ValueWithPrompt).prompt !== undefined;
}

// Return the value string property if the ToggleGroupValue is a
// ValueWithPrompt, or the string itself it the ToggleGroupValue is a string.
// Useful when determining the button text, for example.
function getToggleGroupValueWithPromptValue(toggleGroupValue: ToggleGroupValueWithPrompt): string {
  return isValueWithPrompt(toggleGroupValue) ? toggleGroupValue.value : toggleGroupValue;
}

const ToggleGroup = (props: ToggleGroupProps) => {
  const { isMobile } = useBreakpoint();

  // ---------- CAN'T HAVE PROMPTS LAYOUT ---------- //

  if (isCantHavePromptsLayout(props)) {
    const {
      layout,
      values,
      selectedValue,
      setSelectedValue,
      ordered,
      ...toggleButtonGroupProps
    } = props;

    const handleChange = (e: unknown, newValue: string) => {
      setSelectedValue(newValue);
    };

    // ----- Dynamic ----- //

    if (layout === 'dynamic') {
      return (
        <StyledUnorderedGroupContainer isMobile={isMobile}>
          <StyledUnorderedToggleButtonGroup
            isMobile={isMobile}
            color="primary"
            exclusive
            value={selectedValue}
            onChange={handleChange}
            {...toggleButtonGroupProps}
          >
            {values.map((value, index) => {
              const buttonText = getToggleGroupValueWithPromptValue(value);

              return (
                <ToggleButton
                  value={buttonText}
                  key={buttonText}
                  aria-label={`button ${index + 1}`}
                >
                  {value}
                </ToggleButton>
              );
            })}
          </StyledUnorderedToggleButtonGroup>
        </StyledUnorderedGroupContainer>
      );
    }

    // ----- One button per row ----- //

    return (
      <ToggleButtonGroupOneButtonPerRow
        isMobile={isMobile}
        exclusive
        orientation="vertical"
        value={selectedValue}
        onChange={handleChange}
        {...toggleButtonGroupProps}
      >
        {values.map((v, index) => {
          const buttonText = getToggleGroupValueWithPromptValue(v);

          return (
            <ToggleGroupButton
              key={buttonText}
              value={buttonText}
              content={buttonText}
              aria-label={buttonText}
              idNumber={ordered ? index + 1 : undefined}
            />
          );
        })}
      </ToggleButtonGroupOneButtonPerRow>
    );
  }

  // ---------- CAN HAVE PROMPTS LAYOUT ---------- //

  const {
    layout,
    values,
    selectedValue,
    setSelectedValue,
    ordered,
    equalWidthChildren,
    toggleGroupButtonProps,
    ...toggleButtonGroupProps
  } = props;

  const handleChange = (e: unknown, newValue: string) => {
    setSelectedValue(newValue);
  };

  // This will return a ValueWithPrompt if the currently-selected button is of
  // the ValueWithPrompt type, otherwise it'll return undefined.
  const selectedValueWithPrompt = values.find((value) => {
    if (isValueWithPrompt(value)) {
      return selectedValue === value.value;
    }

    return false;
  }) as ValueWithPrompt | undefined;

  // A prompt component will be shown only if:
  // - A button is selected (we check this via 'selectedValue')
  // - The selected button is of the ValueWithPrompt type. We check this via the
  //   custom type predicate isValueWithPrompt().
  // If the above conditions are not met, the prompt component will be 'null'
  // and nothing will be shown.
  // Only a maximum of 1 prompt will be shown at any given time.
  const promptComponent = selectedValueWithPrompt ? (
    <ToggleGroupButtonPromptContainer>
      {selectedValueWithPrompt.prompt}
    </ToggleGroupButtonPromptContainer>
  ) : null;

  // ----- All buttons on one row ----- //

  return (
    <ToggleButtonGroupOneRowOnlyContainer equalWidthChildren={equalWidthChildren}>
      <ToggleButtonGroupOneRowOnly
        exclusive
        orientation="horizontal"
        value={selectedValue}
        onChange={handleChange}
        equalWidthChildren={equalWidthChildren}
        {...toggleButtonGroupProps}
      >
        {values.map((value, index) => {
          const buttonText = getToggleGroupValueWithPromptValue(value);

          return (
            <ToggleGroupButton
              key={buttonText}
              value={buttonText}
              content={buttonText}
              aria-label={buttonText}
              idNumber={ordered ? index + 1 : undefined}
              hasPrompt={(value as ValueWithPrompt).prompt !== undefined}
              buttonWidth={typeof equalWidthChildren === 'number' ? equalWidthChildren : undefined}
              {...toggleGroupButtonProps}
            />
          );
        })}
      </ToggleButtonGroupOneRowOnly>
      {promptComponent}
    </ToggleButtonGroupOneRowOnlyContainer>
  );
};

export default ToggleGroup;
