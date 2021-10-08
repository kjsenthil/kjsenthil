import * as React from 'react';
import { FlexLink, IconWrapper } from './LinkWithIcon.styles';
import { Spacer, Icon, IconProps, LinkProps } from '../../atoms';

export interface LinkWithIconProps extends LinkProps {
  children: string;
  iconName: IconProps['name'];
}

const LinkWithIcon = ({ children, iconName, ...linkProps }: LinkWithIconProps) => (
  <FlexLink {...linkProps} variant="sh5">
    <IconWrapper>
      <Icon name={iconName} fontSize="inherit" />
    </IconWrapper>
    <Spacer x={1} />
    <span>{children}</span>
  </FlexLink>
);

export default LinkWithIcon;
