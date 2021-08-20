import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MainCard, Button, Typography } from '@tswdts/react-components';
import MyAccountLayout, { MyAccountLayoutProps } from './MyAccountLayout';

export default {
  title: 'Digital Hybrid/Templates/Dashboard Layout',
  component: MyAccountLayout,
  // TODO:
  argTypes: {},
} as Meta;

const Template: Story<MyAccountLayoutProps> = (args) => <MyAccountLayout {...args} />;

const basicInfo = {
  isLoading: false,
  firstName: 'Ava',
  lastName: 'Garcia',
  dateOfBirth: new Date(1984, 1, 1),
  clientAge: 37,
  totalInvested: 148238.52,
  totalGainLoss: 7632.04,
  totalInvestableCash: 51520.22,
};

const defaultArgs: MyAccountLayoutProps = {
  heading: {
    secondary: 'Hi Ava,',
    primary: 'You have £148,231.55',
    tertiary: '£7,122.44 total gain',
  },
  basicInfo,
  children: (
    <MainCard title="Test body" renderActionEl={() => <Button>Click Me</Button>}>
      <Typography variant="h1">Test Content</Typography>
    </MainCard>
  ),
};

export const Default = Template.bind({});
Default.args = defaultArgs;
