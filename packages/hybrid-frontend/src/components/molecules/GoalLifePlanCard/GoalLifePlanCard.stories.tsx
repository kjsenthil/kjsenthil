import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalLifePlanCard, { GoalLifePlanCardProps } from './GoalLifePlanCard';

export default {
  title: 'Digital Hybrid/Molecules/Goal Life Plan Card',
  component: GoalLifePlanCard,
} as Meta;

const Template: Story<GoalLifePlanCardProps> = (args) => <GoalLifePlanCard {...args} />;

const defaultArgs: GoalLifePlanCardProps = {};

export const Default = Template.bind({});
Default.args = defaultArgs;
