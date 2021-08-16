import * as React from 'react';
import { TabProps as MUITabProps } from '../../../atoms';
import { STab } from './Tab.styles';
import TabComponent, { TabComponentProps } from './TabComponent';

export interface TabProps extends Omit<MUITabProps, 'component' | 'wrapped'>, TabComponentProps {}

const Tab = React.forwardRef((props: TabProps, ref) => (
  <STab component={TabComponent} {...props} ref={ref} />
));

export default Tab;
