import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import Tabs, { TabsProps } from './Tabs';
import Tab from './Tab/Tab';

export default {
  title: 'Digital Hybrid/Atoms/Tabs',
  component: Tabs,
  argTypes: {
    // custom argTypes here...
  },
} as Meta;

type StoryProps = Omit<TabsProps, 'children' | 'onChange' | 'action' | 'value'>;

const Template: Story<StoryProps> = (args) => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChangeTab = (e: React.ChangeEvent<{}>, newTab: number) => {
    setCurrentTab(newTab);
  };

  return (
    <Tabs value={currentTab} onChange={handleChangeTab} {...args}>
      <Tab label="Tab 10000000" />
      <Tab label="Tab 2" />
    </Tabs>
  );
};

const defaultArgs: StoryProps = {};

export const Default = Template.bind({});
Default.args = defaultArgs;
