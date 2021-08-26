import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, Grid, Typography } from '../../atoms';
import StickyHeader from '.';
import { StickyHeaderProps } from './StickyHeader';

export default {
  title: 'Digital Hybrid/Molecules/Sticky Header',
  component: StickyHeader,
  argTypes: {},
} as Meta;

const Template: Story<StickyHeaderProps> = (args) => <StickyHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <Grid container justify="center">
      <Grid item xs={6} container justify="center">
        <Typography>Sticky Header Check</Typography>
      </Grid>
      <Grid item xs={6} container justify="center">
        <Button>Sticky Header Button</Button>
      </Grid>
    </Grid>
  ),
};
