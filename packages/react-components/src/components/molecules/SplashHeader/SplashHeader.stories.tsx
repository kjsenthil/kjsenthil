import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SplashHeader, { SplashHeaderProps } from './SplashHeader';
import imageFile from '../../../assets/img/coachSplashHeader.png';

export default {
  title: 'Digital Hybrid/Molecules/Splash Header',
  component: SplashHeader,
  argTypes: {},
} as Meta;

const Template: Story<SplashHeaderProps> = (args) => <SplashHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Coaching',
  bodyText: 'Book a free coaching session to help with your investing',
  buttonText: 'Book an appointment',
  iconName: 'support',
  imageSrc: imageFile,
  imageAlt: 'coach splash header',
  onButtonClick: () => {},
};

export const SplashHeaderLoading = Template.bind({});

SplashHeaderLoading.args = {
  isLoading: true,
  ...Default.args,
};
