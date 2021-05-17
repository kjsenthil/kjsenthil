import * as React from 'react';
import Spacer, { SpacerProps } from './Spacer';

const Divider = (props: Omit<SpacerProps, 'asDivider'>) => <Spacer asDivider {...props} />;

export default Divider;
