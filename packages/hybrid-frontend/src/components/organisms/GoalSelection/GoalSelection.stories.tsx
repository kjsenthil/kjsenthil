import { Meta, Story } from '@storybook/react/types-6-0';
import * as React from 'react';
import GoalSelection, { GoalSelectionProps } from './GoalSelection';

export default {
  title: 'Digital Hybrid/Organisms/Goal Selection',
  component: GoalSelection,
} as Meta;

const Template: Story<GoalSelectionProps> = (args) => <GoalSelection {...args} />;

const defaultArgs = {
  tiles: [
    {
      name: 'Retirement',
      iconSrc: 'goals/retirement.webp',
    },
    {
      name: 'Buying a home',
      iconSrc: 'goals/buying-a-home.webp',
      disabled: true,
    },
    {
      name: "My child's education",
      iconSrc: 'goals/my-childs-education.webp',
    },
    {
      name: 'Something else',
      iconSrc: 'goals/something-else.webp',
      disabled: true,
    },
    {
      name: 'Just grow my money',
      iconSrc: 'goals/just-grow-my-money.webp',
      disabled: true,
    },
  ],
};

export const Default = Template.bind({});
Default.args = defaultArgs;
