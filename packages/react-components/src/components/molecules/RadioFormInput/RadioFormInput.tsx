import * as React from 'react';
import { Typography, Spacer } from '../../atoms';
import { StyledGrid, StyledRadio, StyledRadioFormInput } from './RadioFormInput.styles';
import FormInput, { FormInputProps } from '../FormInput';

export interface RadioFormInputProps {
  radioLabel: string;
  radioValue: string;
  inputProps: FormInputProps;
  renderDetails?: React.ReactNode;
}

interface MyRadioInputProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-testid'?: string;
}

const RadioFormInput = ({
  radioLabel,
  radioValue,
  inputProps,
  renderDetails,
}: RadioFormInputProps) => {
  const inputRef = React.useRef<HTMLInputElement | undefined>();
  const radioRef = React.useRef<HTMLInputElement | undefined>();
  const { name, label, isCurrency, value, error, onChange } = inputProps;

  const onRadioClick = () => inputRef.current?.focus();
  const onFocus = () => radioRef.current?.click();

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
        <>
          <StyledGrid>
            <Typography variant="b4" color="primary" colorShade="dark2">
              {radioLabel}
            </Typography>
            <Spacer y={1} />
            <FormInput
              inputRef={inputRef}
              type="number"
              hideNumberSpinButton
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
          {renderDetails || null}
        </>
      }
    />
  );
};

export default RadioFormInput;
