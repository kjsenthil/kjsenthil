import * as React from 'react';
import { Disable as DefaultDisabled } from 'react-disable';
import { Tooltip } from '../../atoms';
import WrapperDiv from './DisabledComponents.styles';
import { TooltipProps } from '../../atoms/Tooltip/Tooltip';

interface DisabledComponentProps extends TooltipProps {}

const DisabledComponent = ({ children, ...props }: DisabledComponentProps) => (
  <Tooltip {...props}>
    <WrapperDiv>
      <DefaultDisabled disabled>{children}</DefaultDisabled>
    </WrapperDiv>
  </Tooltip>
);

export type { DisabledComponentProps };
export default DisabledComponent;
