import React from 'react';
import Button, { ButtonProps } from '../Button';

export interface PillProps extends Omit<ButtonProps, 'color' | 'variant' | 'size' | 'fullWidth'> {
  variant?: 'selected' | 'selectable' | 'creator';
  selectedColor?: 'primary' | 'secondary' | 'tertiary';
}

const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  ({ variant = 'selected', selectedColor = 'primary', ...props }, ref) => {
    let color: ButtonProps['color'] = variant === 'selected' ? selectedColor : 'grey';
    let pillVariant: ButtonProps['variant'] = 'contained';

    if (variant === 'creator') {
      color = 'primary';
      pillVariant = 'dashed';
    }

    return (
      <Button
        {...props}
        ref={ref}
        isPill
        color={color}
        variant={pillVariant}
        size="large"
        fullWidth={false}
      />
    );
  }
) as React.FC<PillProps>;

export default Pill;
