import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import GoalMainCardPlaceholder, { GoalMainCardPlaceholderProps } from './GoalMainCardPlaceholder';

import imageFile from '../../../assets/img/lifePlan.png';

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
  imageElement: <img src={imageFile} alt="Goal placeholder" width="100%" />,
  // eslint-disable-next-line no-alert
  onRetirementClick: () => alert('Navigating to life plan management page'),
  // eslint-disable-next-line no-alert
  onCreateDefaultGoal: () => alert('Creating default goal'),
};

export const Default = Template.bind({});
Default.args = defaultArgs;
