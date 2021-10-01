import React from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Icon, InputAdornment, TextField, TextFieldProps, IconButton } from '../../atoms';
import { FormInputWrapper } from '../../particles';
import validatePassword, { ValidatePasswordProps } from '../../../utils/validators';

export interface FormInputProps extends TextFieldProps {
  name: string;
  value?: string;
  label: string;
  info?: string;
  error?: string;
  isCurrency?: boolean;
  isPassword?: boolean;
  shouldDelayOnChange?: boolean;
  hideLabel?: boolean;
  hideNumberSpinButton?: boolean;
  validationArgs?: ValidatePasswordProps;
}

const FormInput = ({
  isCurrency,
  isPassword,
  value,
  shouldDelayOnChange,
  hideLabel,
  hideNumberSpinButton,
  validationArgs,
  onChange,
  ...props
}: FormInputProps) => {
  const {
    id,
    name,
    info,
    error,
    startAdornment,
    endAdornment,
    type,
    label,
    placeholder,
    fullWidth,
  } = props;

  const [val, setValue] = React.useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
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

  const passwordAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword(!showPassword)}
        name="toggle password visibility"
      >
        {showPassword ? <Visibility color="primary" /> : <VisibilityOff />}
      </IconButton>
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

  const passwordType = showPassword ? 'text' : 'password';
  /* eslint-disable no-nested-ternary */
  const inputType = isCurrency ? 'number' : isPassword ? passwordType : type;
  const validPassword = val ? validatePassword(val, { ...validationArgs }) : true;

  return (
    <FormInputWrapper
      label={label}
      hideLabel={hideLabel || isCurrency}
      info={!validPassword ? info : undefined}
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
        endAdornment={isPassword ? passwordAdornment : endAdornment}
        type={inputType}
        hideNumberSpinButton={hideNumberSpinButton || isCurrency}
      />
    </FormInputWrapper>
  );
};

export default FormInput;
