import * as React from 'react';
import { RadioGroupProps as MUIRadioGroupProps } from '@material-ui/core';
import { FormLabel, FormControl, Box, RadioGroup as MUIRadioGroup } from '../../atoms';

export interface RadioGroupProps extends MUIRadioGroupProps {
  label?: string | React.ReactNode;
}

const RadioGroup = ({ label, children, ...props }: RadioGroupProps) => (
  <FormControl>
    <MUIRadioGroup {...props}>
      {label && (
        <Box mb={1}>
          <FormLabel>{label}</FormLabel>
        </Box>
      )}

      {children}
    </MUIRadioGroup>
  </FormControl>
);

export default RadioGroup;
