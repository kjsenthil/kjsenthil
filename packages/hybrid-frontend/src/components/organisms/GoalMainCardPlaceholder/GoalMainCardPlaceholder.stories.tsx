import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalMainCardPlaceholder, { GoalMainCardPlaceholderProps } from './GoalMainCardPlaceholder';

import imageFile from '../../../assets/img/lifePlan.png';
import { goalCreationPaths } from '../../../config/paths';

export default {
  title: 'Digital Hybrid/Organisms/Goal Main Card Placeholder',
  component: GoalMainCardPlaceholder,
  // TODO:
  argTypes: {},
} as Meta;

const Template: Story<GoalMainCardPlaceholderProps> = (args) => (
  <GoalMainCardPlaceholder {...args} />
);

const defaultArgs: GoalMainCardPlaceholderProps = {
  title: "Ava's life plan",
  buttons: goalCreationPaths,
  imageElement: <img src={imageFile} alt="Goal placeholder" width="100%" />,
  vertical: false,
  // eslint-disable-next-line no-alert
  onAddGoal: (path) => alert(`Navigating to ${path}`),
  // eslint-disable-next-line no-alert
  onCreateDefaultGoal: () => alert('Creating default goal'),
};

export const Default = Template.bind({});
Default.args = defaultArgs;
