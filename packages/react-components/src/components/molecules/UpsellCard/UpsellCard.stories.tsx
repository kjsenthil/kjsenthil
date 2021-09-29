import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import UpsellCard, { UpsellCardProps } from './UpsellCard';
import { Button, Typography } from '../../atoms';

export default {
  title: 'Digital Hybrid/Molecules/Upsell Card',
  component: UpsellCard,
  argTypes: {
    background: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'triangle-overlay'],
    },
  },
} as Meta;

const Template: Story<UpsellCardProps> = (args) => <UpsellCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Test Title',
  children: (
    <>
      <Typography fontWeight="600" variant="b2" color="white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br />
        eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />
      </Typography>
      <Button color="white" variant="contained">
        Click Me
      </Button>
    </>
  ),
};

export const UpsellCardLoading = Template.bind({});
UpsellCardLoading.args = {
  title: 'Test Title',
  renderActionEl: () => <Button>Click Me</Button>,
  children: <Typography variant="h1">Test Content</Typography>,
  isLoading: true,
};
