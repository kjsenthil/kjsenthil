import { Meta, Story } from '@storybook/react/types-6-0';
import * as React from 'react';
import GoalTile, { GoalTileProps } from './GoalTile';

export default {
  title: 'Digital Hybrid/Molecules/Goal Tile',
  component: GoalTile,
} as Meta;

const Template: Story<GoalTileProps> = (args) => <GoalTile {...args} />;

const defaultArgs = {
  goalName: 'Spend all the money',
  iconSrc: '/goal-graphic.png',
};

export const Default = Template.bind({});
Default.args = defaultArgs;
