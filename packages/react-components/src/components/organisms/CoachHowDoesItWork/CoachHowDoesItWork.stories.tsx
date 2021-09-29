import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CoachHowDoesItWork from './CoachHowDoesItWork';

export default {
  title: 'Digital Hybrid/Organisms/Coach How Does It Work',
  component: CoachHowDoesItWork,
} as Meta;

const Template: Story = ({ ...args }) => <CoachHowDoesItWork {...args} />;

export const Default = Template.bind({});
