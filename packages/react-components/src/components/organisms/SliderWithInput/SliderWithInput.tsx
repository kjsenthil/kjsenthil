import * as React from 'react';
import { Slider, SliderProps, Typography, TypographyProps } from '../../atoms';
import { FormInput, FormInputProps } from '../../molecules';
import {
  SliderWithInputContainer,
  SliderWithInputInputContainer,
  SliderWithInputLayout,
  SliderWithInputSliderContainer,
  SliderWithInputTypographyContainer,
} from './SliderWithInput.styles';
import getSliderWithInputInfoText from './getInfoText/getSliderWithInputInfoText';

export interface SliderWithInputProps {
  layout?: SliderWithInputLayout;

  // For semantic & accessibility purpose
  name: string;

  label: string;
  min?: number;
  max?: number;
  step?: number;

  // The value and its associated update handler that's used by both the slider
  // and the number input. Note that we're allowing single-value slider only for
  // now.
  value: number;
  setValue: (newValue: number) => void;

  // If true, will style the input element with its currency variant.
  isCurrency?: boolean;

  // These allow prop overriding of all the underlying components.
  // We're also omitting a few props that either have already been defined in
  // the main SliderWithInputProps interface, or should not be defined by the
  // consumer of the component.
  labelTypographyProps?: Omit<TypographyProps, 'children'>;
  formInputProps?: Omit<
    FormInputProps,
    | 'type'
    | 'startAdornment'
    | 'isCurrency'
    | 'label'
    | 'name'
    | 'value'
    | 'hideLabel'
    | 'fullWidth'
  >;
  sliderProps?: Omit<SliderProps, 'min' | 'max' | 'step'>;
}

const BASE_ID = 'slider-with-input'; // For semantic & accessibility purposes

export default function SliderWithInput({
  layout = 'slider-next-to-input',
  name,
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  setValue,
  isCurrency,
  labelTypographyProps,
  formInputProps,
  sliderProps,
}: SliderWithInputProps) {
  // Accessibility stuff
  const labelId = `${BASE_ID}-${name}-input-label`;

  // Note: the actual onChange handler for the slider can accept an array value,
  // creating a range slider. We don't support this (yet).
  const handleSliderChange = (e: React.ChangeEvent<{}>, newValue: number | number[]) => {
    // It's ok to do this assertion since we don't accept arrays for the 'value'
    // prop anyway.
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <SliderWithInputContainer layout={layout}>
      <SliderWithInputTypographyContainer layout={layout}>
        <Typography id={labelId} variant="sh3" {...labelTypographyProps}>
          {label}
        </Typography>
      </SliderWithInputTypographyContainer>

      <SliderWithInputInputContainer layout={layout}>
        <FormInput
          name={name}
          label={label}
          value={`${value}`}
          onChange={handleInputChange}
          hideLabel
          fullWidth
          inputProps={{
            max,
            min,
            step,
            type: 'number',
            'aria-labelledby': labelId,
          }}
          isCurrency={isCurrency}
          info={getSliderWithInputInfoText({ min, max, value })}
          {...formInputProps}
        />
      </SliderWithInputInputContainer>

      <SliderWithInputSliderContainer layout={layout}>
        <Slider
          name={name}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleSliderChange}
          aria-labelledby={labelId}
          data-testid="slider-with-input-slider-container"
          {...sliderProps}
        />
      </SliderWithInputSliderContainer>
    </SliderWithInputContainer>
  );
}
