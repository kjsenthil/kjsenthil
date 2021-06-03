import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalCreationLayout, { GoalCreationLayoutProps } from './GoalCreationLayout';
import { Button, Typography } from '../../atoms';
import { MainCard } from '../../molecules';

export default {
  title: 'Digital Hybrid/Templates/Goal Creation Layout',
  component: GoalCreationLayout,
  argTypes: {},
} as Meta;

const Template: Story<GoalCreationLayoutProps> = (args) => <GoalCreationLayout {...args} />;

const defaultArgs = {
  children: (
    <MainCard title="Test body" renderActionEl={() => <Button>Click Me</Button>}>
      <Typography variant="h1">Test Content</Typography>
    </MainCard>
  ),
  progressEventHandler: () => {},
};

export const Default = Template.bind({});
Default.args = defaultArgs;
