import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import MyAccountLayout, { MyAccountLayoutProps } from './MyAccountLayout';
import { Button, Typography } from '../../atoms';
import { MainCard } from '../../molecules';

export default {
  title: 'Digital Hybrid/Templates/Dashboard Layout',
  component: MyAccountLayout,
  // TODO:
  argTypes: {},
} as Meta;

const Template: Story<MyAccountLayoutProps> = (args) => <MyAccountLayout {...args} />;

const defaultArgs: MyAccountLayoutProps = {
  heading: {
    secondary: 'Hi Ava,',
    primary: 'You have £148,231.55',
    tertiary: '£7,122.44 total gain',
  },
  children: (
    <MainCard title="Test body" renderActionEl={() => <Button>Click Me</Button>}>
      <Typography variant="h1">Test Content</Typography>
    </MainCard>
  ),
};

export const Default = Template.bind({});
Default.args = defaultArgs;
