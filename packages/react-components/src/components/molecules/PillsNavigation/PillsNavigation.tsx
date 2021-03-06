import * as React from 'react';
import { TabsProps } from '../../atoms';
import { PillsNavigationTabs } from './PillsNavigation.styles';

export type PillsNavigationProps = TabsProps;

export type PillNavigationOnChangeProps = ((event: React.ChangeEvent<{}>, value: any) => void) &
  React.FormEventHandler<HTMLButtonElement>;

export default function PillsNavigation(props: PillsNavigationProps) {
  return <PillsNavigationTabs variant="scrollable" scrollButtons="off" {...props} />;
}
