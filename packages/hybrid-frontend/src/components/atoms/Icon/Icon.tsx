import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import icons from './icons';

export interface IconProps extends SvgIconProps {
  name: keyof typeof icons;
}

const Icon = ({ name, ...props }: IconProps) => (
  <SvgIcon {...props}>
    <path d={icons[name]} />
  </SvgIcon>
);

export default Icon;
