import { Meta, Story } from '@storybook/react/types-6-0';
import * as React from 'react';
import GoalSelection, { GoalSelectionProps } from './GoalSelection';

export default {
  title: 'Digital Hybrid/Organisms/Goal Selection',
  component: GoalSelection,
} as Meta;

const Template: Story<GoalSelectionProps> = (args) => (
  // Due to the specific styling requirement (there's always an empty block at
  // the top right corner), we are having an outer padding to align the Story
  // to how the GoalSelection component actually appears on a page.
  // Note that we have the option to modify the breakpoints by passing a custom
  // breakpointsPx prop, allowing us adjust to whatever breakpoints necessary.
  <div style={{ padding: '72px 80px' }}>
    <GoalSelection {...args} />
  </div>
);

const defaultArgs = {
  tiles: [
    {
      name: 'Retirement',
      iconSrc: 'goals/retirement.webp',
      category: 1,
      href: '/blah',
    },
    {
      name: 'Buying a home',
      iconSrc: 'goals/buying-a-home.webp',
      category: 2,
      disabled: true,
    },
    {
      name: "My child's education",
      iconSrc: 'goals/my-childs-education.webp',
      category: 3,
      disabled: true,
    },
    {
      name: 'Something else',
      iconSrc: 'goals/something-else.webp',
      category: 4,
      disabled: true,
    },
    {
      name: 'Just grow my money',
      iconSrc: 'goals/just-grow-my-money.webp',
      category: 5,
      disabled: true,
    },
  ],

  breakpointsPx: {
    oneColumn: 863,
    twoColumns: 1397,
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;
