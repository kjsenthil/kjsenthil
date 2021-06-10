import * as React from 'react';
import { Disable as DefaultDisabled } from 'react-disable';
import { Tooltip } from '../../atoms';
import WrapperDiv from './DisabledComponents.styles';

interface DisabledComponentProps {
  title: string;
  arrow?: boolean;
  placement?: string;
  open?: boolean;
  children: React.ReactNode;
}

const DisabledComponent = ({ children, ...props }: DisabledComponentProps) => (
  <Tooltip {...props}>
    <WrapperDiv>
      <DefaultDisabled disabled>{children}</DefaultDisabled>
    </WrapperDiv>
  </Tooltip>
);

export type { DisabledComponentProps };
export default DisabledComponent;
