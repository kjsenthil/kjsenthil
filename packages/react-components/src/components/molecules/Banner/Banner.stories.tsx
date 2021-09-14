import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Banner, { BannerProps } from './Banner';
import icons from '../../atoms/Icon/icons';

export default {
  title: 'Digital Hybrid/Molecules/Banner',
  component: Banner,
  argTypes: {
    icon: {
      control: {
        type: 'radio',
        options: Object.keys(icons),
      },
    },
    hasAction: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const Template: Story<BannerProps> = (args) => <Banner {...args} />;

const defaultArgs: BannerProps = {
  icon: 'errorCircle',
  title: 'We don’t have your bank details',
  paragraph: 'Please tell us which account you would like to use for your monthly contributions.',
};

export const Default = Template.bind({});

Default.args = defaultArgs;

export const WithButton = Template.bind({});

WithButton.args = { ...defaultArgs, buttonLabel: 'Button' };
