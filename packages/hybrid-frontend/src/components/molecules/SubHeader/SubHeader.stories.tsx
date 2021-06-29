import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, Grid, Typography } from '../../atoms';
import SubHeader from '.';
import { SubHeaderProps } from './SubHeader';

export default {
  title: 'Digital Hybrid/Molecules/Sub Header',
  component: SubHeader,
  argTypes: {},
} as Meta;

const Template: Story<SubHeaderProps> = (args) => <SubHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <Grid container justify="center">
      <Grid item xs={6} container justify="center">
        <Typography>Sub Header Check</Typography>
      </Grid>
      <Grid item xs={6} container justify="center">
        <Button>Sub Header Button</Button>
      </Grid>
    </Grid>
  ),
};
