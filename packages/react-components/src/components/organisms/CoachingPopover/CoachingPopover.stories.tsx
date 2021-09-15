import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CoachingPopover from './CoachingPopover';
import imageFile from '../../../assets/img/coachPortrait.png';

export default {
  title: 'Digital Hybrid/Organisms/Coaching Popover',
  component: CoachingPopover,
} as Meta;

const Template: Story = () => (
  <CoachingPopover
    image={<img src={imageFile} width="100%" alt="Portrait of a coach" />}
    onButtonClick={() => {}}
  />
);

export const Default = Template.bind({});
