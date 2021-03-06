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
  buttons: {
    retirement: {
      name: 'Retirement',
    },
    buyingAHome: {
      name: 'Buying a home',
    },
    myChildsEducation: {
      name: "My child's education",
    },
    startingABusiness: {
      name: 'Starting a business',
    },
    emergencyFunds: {
      name: 'Emergency funds',
    },
    somethingElse: {
      name: 'Something else',
    },
  },
  imageElement: <img src={imageFile} alt="Goal placeholder" width="100%" />,
  vertical: false,
  // eslint-disable-next-line no-alert
  onAddGoal: (path) => alert(`Navigating to ${path}`),
  // eslint-disable-next-line no-alert
  onCreateDefaultGoal: () => alert('Creating default goal'),
};

export const Default = Template.bind({});
Default.args = defaultArgs;
