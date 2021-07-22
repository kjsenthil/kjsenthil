import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import TabsNavigation, { TabsNavigationProps } from './TabsNavigation';

export default {
  title: 'Digital Hybrid/Molecules/Tabs Navigation',
  component: TabsNavigation,
  argTypes: {
    currentPath: {
      control: {
        type: null,
      },
    },
    tabProps: {
      control: {
        type: null,
      },
    },
    tabsProps: {
      control: {
        type: null,
      },
    },
  },
} as Meta;

type StoryProps = Omit<TabsNavigationProps, 'navigate' | 'currentPath'>;

const Template: Story<TabsNavigationProps> = (args) => {
  const [currentPath, setCurrentPath] = React.useState('');

  return <TabsNavigation {...args} navigate={setCurrentPath} currentPath={currentPath} />;
};

const defaultArgs: StoryProps = {
  tabs: [
    { path: '#abc', label: 'Abc' },
    { path: '#def', label: 'Def' },
    { path: 'ghi/jkl', label: 'Ghi/jkl' },
    { path: 'mno/#pqr', label: 'Mno/#pqr' },
  ],
};

export const Default = Template.bind({});
Default.args = defaultArgs;
