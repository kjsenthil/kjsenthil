import * as React from 'react';
import { Typography, Spacer } from '../../atoms';
import { FormInput } from '..';
import { StyledGrid, StyledRadio, StyledRadioFormInput } from './RadioFormInput.styles';
import { FormInputProps } from '../FormInput';

export interface RadioFormInputProps {
  radioLabel: string;
  radioValue: string;
  inputProps: FormInputProps;
}

interface MyRadioInputProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-testid'?: string;
}

const RadioFormInput = ({ radioLabel, radioValue, inputProps }: RadioFormInputProps) => {
  const inputRef = React.useRef<HTMLInputElement | undefined>();
  const radioRef = React.useRef<HTMLInputElement | undefined>();
  const onRadioClick = () => inputRef.current?.focus();
  const onFocus = () => radioRef.current?.click();
  const { name, label, isCurrency, value, error, onChange } = inputProps;

  return (
    <StyledRadioFormInput
      value={radioValue}
      control={
        <StyledRadio
          inputRef={radioRef}
          onClick={onRadioClick}
          inputProps={{ 'data-testid': `radio-${radioValue}` } as MyRadioInputProps}
        />
      }
      label={
        <StyledGrid>
          <Typography variant="b4" color="primary" colorShade="dark2">
            {radioLabel}
          </Typography>
          <Spacer y={1} />
          <FormInput
            inputRef={inputRef}
            fullWidth
            isCurrency={isCurrency}
            name={name}
            label={label}
            hideLabel
            value={value}
            error={error}
            onFocus={onFocus}
            onChange={onChange}
          />
        </StyledGrid>
      }
    />
  );
};

export default RadioFormInput;
