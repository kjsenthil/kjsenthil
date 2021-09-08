import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import icons from './icons';

export interface IconProps extends Pick<SvgIconProps, 'fontSize'> {
  name: keyof typeof icons | string;
  color?: SvgIconProps['color'] | 'error';
}

const Icon = ({ name, color, ...props }: IconProps) => (
  <SvgIcon {...props} color={color as SvgIconProps['color']}>
    <title>{name}</title>
    <path d={icons[name]} fillRule="evenodd" />
  </SvgIcon>
);

export default Icon;
