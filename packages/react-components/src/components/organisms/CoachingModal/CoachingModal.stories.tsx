import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CoachingModal from './CoachingModal';
import imageFile from '../../../assets/img/coachPortrait.png';

export default {
  title: 'Digital Hybrid/Organisms/Coaching Modal',
  component: CoachingModal,
} as Meta;

const Template: Story = () => (
  <CoachingModal image={<img src={imageFile} width="100%" alt="Portrait of a coach" />} />
);

export const Default = Template.bind({});
