import * as React from 'react';
import { TabProps as MUITabProps } from '../../../atoms';
import { STab } from './Tab.styles';
import TabComponent, { TabComponentTypographyProps } from './TabComponent';

export interface TabProps extends Omit<MUITabProps, 'component' | 'wrapped'> {
  labelProps?: TabComponentTypographyProps;
}

const Tab = React.forwardRef((props: TabProps, ref) => (
  <STab component={TabComponent} {...props} innerRef={ref} />
));

export default Tab;
