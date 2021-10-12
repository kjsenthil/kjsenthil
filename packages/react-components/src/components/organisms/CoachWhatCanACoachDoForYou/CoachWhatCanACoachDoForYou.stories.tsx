import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CoachWhatCanACoachDoForYou from './CoachWhatCanACoachDoForYou';

export default {
  title: 'Digital Hybrid/Organisms/Coach What can a coach do for you',
  component: CoachWhatCanACoachDoForYou,
} as Meta;

const Template: Story = (args) => <CoachWhatCanACoachDoForYou {...args} />;

export const Default = Template.bind({});
