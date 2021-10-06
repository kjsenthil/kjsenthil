import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Typography } from '@tswdts/react-components/src';

import OnboardingLayout, { OnboardingLayoutProps } from './OnboardingLayout';

export default {
  title: 'Digital Hybrid/Templates/Onboarding Layout',
  component: OnboardingLayout,
  argTypes: {},
} as Meta;

const Template: Story<OnboardingLayoutProps> = (args) => <OnboardingLayout {...args} />;
const stepNames = [
  'Create profile',
  'Select account',
  'Verify bank details (optional)',
  'Add money (optional)',
  'Success',
];

const defaultArgs: OnboardingLayoutProps = {
  title: 'This is a standard title',
  primaryActionProps: {
    children: 'Continue',
    variant: 'contained',
  },
  secondaryActionProps: {
    children: 'Back',
    variant: 'outlined',
  },
  tertiaryActionProps: {
    children: 'Skip',
    variant: undefined,
  },
  stepNames,
  currentStep: 2,
  contentLeft: (
    <Typography variant="b2" color="primary">
      The content to be displayed on the left. The content to be displayed on the left. The content
      to be displayed on the left. The content to be displayed on the left. The content to be
      displayed on the left. The content to be displayed on the left. The content to be displayed on
      the left. The content to be displayed on the left. The content to be displayed on the left.
      The content to be displayed on the left. The content to be displayed on the left. The content
      to be displayed on the left. The content to be displayed on the left. The content to be
      displayed on the left. The content to be displayed on the left. The content to be displayed on
      the left. The content to be displayed on the left. The content to be displayed on the left.
      The content to be displayed on the left. The content to be displayed on the left. The content
      to be displayed on the left. The content to be displayed on the left. The content to be
      displayed on the left. The content to be displayed on the left. The content to be displayed on
      the left. The content to be displayed on the left. The content to be displayed on the left.
      The content to be displayed on the left. The content to be displayed on the left.
    </Typography>
  ),

  contentRight: null,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.parameters = {
  layout: 'fullscreen',
};
