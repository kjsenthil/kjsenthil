import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';

export interface PrimaryButtonProps extends ButtonProps {
  label: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, ...props }) => (
  <Button variant="contained" color="primary" {...props}>
    {label}
  </Button>
);

export default PrimaryButton;