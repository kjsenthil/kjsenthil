import React from 'react';
import Button, { ButtonProps } from '../Button';

export interface PillProps extends Omit<ButtonProps, 'color' | 'variant' | 'size' | 'fullWidth'> {
  variant?: 'selected' | 'selectable' | 'creator';
  selectedColor?: 'primary' | 'secondary' | 'tertiary';
}

const Pill = ({ variant = 'selected', selectedColor = 'primary', ...props }: PillProps) => {
  let color: ButtonProps['color'] = variant === 'selected' ? selectedColor : 'grey';
  let pillVariant: ButtonProps['variant'] = 'contained';

  if (variant === 'creator') {
    color = 'primary';
    pillVariant = 'dashed';
  }

  return (
    <Button {...props} isPill color={color} variant={pillVariant} size="large" fullWidth={false} />
  );
};

export default Pill;
