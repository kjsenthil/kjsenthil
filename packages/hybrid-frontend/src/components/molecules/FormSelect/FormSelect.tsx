import React from 'react';
import Select, { SelectProps } from '../../atoms/Select';
import { FormInputWrapper } from '../../particles';

export interface FormSelectProps extends SelectProps {
  label: string;
  error?: string;
}

const FormSelect: React.FC<FormSelectProps> = (props) => {
  const { id, name, value, error, label } = props;
  return (
    <FormInputWrapper
      label={label}
      error={error}
      id={id || name}
      hasValue={!!value}
      hasLeadingIcon={false}
    >
      <Select {...props} id={id || name} labelId={id || name} hasError={!!error} />
    </FormInputWrapper>
  );
};

export default FormSelect;
