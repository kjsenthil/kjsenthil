import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Grid } from '@material-ui/core';
import GoalSelection, { GoalSelectionProps } from './GoalSelection';
import { Goals } from '../../../constants';

export default {
  title: 'Digital Hybrid/Organisms/Goal Selection',
  component: GoalSelection,
  argTypes: { onSubmit: { action: 'submitted' } },
} as Meta;

const Template: Story<GoalSelectionProps> = (args) => (
  <Grid container alignItems="center" justify="center">
    <GoalSelection {...args} />
  </Grid>
);

const defaultArgs: GoalSelectionProps = {
  onSubmit: (goal: Goals) =>
    new Promise((resolve) => {
      // eslint-disable-next-line no-alert
      alert(`You have selected ${goal}`);
      resolve();
    }),
};

export const Default = Template.bind({});
Default.args = defaultArgs;
