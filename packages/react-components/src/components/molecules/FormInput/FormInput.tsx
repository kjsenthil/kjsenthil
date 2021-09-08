import React from 'react';
import { Icon, InputAdornment, TextField, TextFieldProps } from '../../atoms';
import { FormInputWrapper } from '../../particles';

export interface FormInputProps extends TextFieldProps {
  name: string;
  value?: string;
  label: string;
  error?: string;
  isCurrency?: boolean;
  shouldDelayOnChange?: boolean;
}

const FormInput = ({
  isCurrency,
  value,
  shouldDelayOnChange,
  onChange,
  ...props
}: FormInputProps) => {
  const { id, name, error, startAdornment, type, label, placeholder, fullWidth } = props;

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

  const currencyAdornment = (
    <InputAdornment position="start">
      <Icon name="britishPound" />
    </InputAdornment>
  );

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
      hideLabel={isCurrency}
      error={error}
      id={id || name}
      hasValue={!!value}
      hasLeadingIcon={!!startAdornment || !!isCurrency}
      fullWidth={!!fullWidth}
    >
      <TextField
        {...props}
        data-testid={`form-input-field-${name}`}
        id={id || name}
        value={val !== undefined ? val : value ?? ''}
        hasError={!!error}
        placeholder={placeholder || label}
        fullWidth={fullWidth}
        isCurrency={isCurrency}
        onChange={handleOnChange}
        startAdornment={isCurrency ? currencyAdornment : startAdornment}
        type={isCurrency ? 'number' : type}
        hideNumberSpinButton={isCurrency}
      />
    </FormInputWrapper>
  );
};

export default FormInput;
