import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import StepProgress, { StepProgressProps } from './StepProgress';

export default {
  title: 'Digital Hybrid/Molecules/Step Progress',
  component: StepProgress,
  argTypes: {},
} as Meta;

const stepNames = [
  'Create profile',
  'Select account',
  'Verify bank details (optional)',
  'Add money (optional)',
  'Success',
];

const defaultProps = {
  stepNames,
  progress: 1,
};
const Template: Story<StepProgressProps> = (args) => <StepProgress {...args} />;

export const FirstStep = Template.bind({});

FirstStep.args = {
  currentStep: 1,
  ...defaultProps,
};

export const SecondStep = Template.bind({});

SecondStep.args = {
  currentStep: 2,
  ...defaultProps,
};

export const ThirdStep = Template.bind({});

ThirdStep.args = {
  currentStep: 3,
  ...defaultProps,
};

export const FourthStep = Template.bind({});

FourthStep.args = {
  currentStep: 4,
  ...defaultProps,
};

export const FifthStep = Template.bind({});

FifthStep.args = {
  currentStep: 5,
  ...defaultProps,
};
