import React from 'react';
import { TextField, TextFieldProps } from '../../atoms';
import { FormInputWrapper } from '../../particles';

export interface FormInputProps extends TextFieldProps {
  name: string;
  value: string;
  label: string;
  error?: string;
  shouldDelayOnChange?: boolean;
}

const FormInput = ({ value, shouldDelayOnChange, onChange, ...props }: FormInputProps) => {
  const { id, name, error, startAdornment, label, placeholder, fullWidth } = props;

  const [val, setValue] = React.useState<string | undefined>(undefined);
  const [changeStarted, setChangeStarted] = React.useState(false);
  const timeoutId = React.useRef<number>(0);

  React.useEffect(() => {
    if (val !== value) {
      setValue(value);
    }
    setChangeStarted(false);
  }, [value]);

  React.useEffect(() => {
    if (onChange === undefined || !shouldDelayOnChange || val === undefined || !changeStarted) {
      return;
    }

    const timeout = setTimeout(() => {
      if (val !== undefined) {
        onChange({ target: { value: val } } as React.ChangeEvent<
          HTMLTextAreaElement | HTMLInputElement
        >);
      }
    }, 250);

    timeoutId.current = (timeout as unknown) as number;
  }, [val]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (shouldDelayOnChange) {
      clearTimeout(timeoutId.current);
      setChangeStarted(true);
    } else if (onChange) {
      onChange(e);
    }
  };

  return (
    <FormInputWrapper
      label={label}
      error={error}
      id={id || name}
      hasValue={!!value}
      hasLeadingIcon={!!startAdornment}
      fullWidth={!!fullWidth}
    >
      <TextField
        {...props}
        id={id || name}
        value={val !== undefined ? val : value ?? ''}
        hasError={!!error}
        placeholder={placeholder || label}
        fullWidth={fullWidth}
        onChange={handleOnChange}
      />
    </FormInputWrapper>
  );
};

export default FormInput;
