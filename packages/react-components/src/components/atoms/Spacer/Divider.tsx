import * as React from 'react';
import Spacer, { SpacerProps } from './Spacer';

const Divider = (props: Omit<SpacerProps, 'asDivider'>) => {
  const { orientation, thickness } = props;
  const spacerProps = {
    [orientation === 'horizontal' ? 'y' : 'x']: thickness ?? 0,
    ...props,
  };
  return <Spacer asDivider {...spacerProps} />;
};

export default Divider;
