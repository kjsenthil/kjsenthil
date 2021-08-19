import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Spacer, { SpacerProps } from './Spacer';
import Typography from '../Typography';

export default {
  title: 'Digital Hybrid/Atoms/Spacer',
  component: Spacer,
  argTypes: {
    x: {
      control: {
        type: 'number',
      },
    },
    y: {
      control: {
        type: 'number',
      },
      default: 3,
    },
    asDivider: {
      control: {
        type: 'boolean',
      },
      options: ['True', 'False'],
    },
  },
} as Meta;

const Template1: Story<SpacerProps> = (args) => (
  <>
    <Typography>Before spacer</Typography>
    <Spacer {...args} />
    <Typography>Ater spacer</Typography>
  </>
);

export const Horizontal = Template1.bind({});
Horizontal.args = {
  y: 3,
};
