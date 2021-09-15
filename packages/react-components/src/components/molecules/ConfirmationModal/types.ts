import { ReactNode } from 'react';
import { DialogProps, ButtonProps, IconProps } from '../../atoms';

interface CustomIconProps extends Omit<IconProps, 'name' | 'color'> {
  name: 'infoCircleIcon' | 'errorCircle';
  color: 'primary' | 'error';
}

interface CustomButtonProps extends Omit<ButtonProps, 'variant | color'> {
  variant: 'contained' | 'outlined';
  color: 'primary';
  label: string;
  handler: (args: any) => any;
}

interface ConfirmationModalProps extends DialogProps {
  title: string;
  icon: CustomIconProps;
  message: ReactNode;
  buttons: CustomButtonProps[];
}

export type { CustomIconProps, CustomButtonProps, ConfirmationModalProps };
