import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import CoachMeetTheCoaches, { MeetTheCoachesProps } from './CoachMeetTheCoaches';
import MattMorganFile from '../../../assets/img/coachIcon.png';
import SammyLawsonFile from '../../../assets/img/coachSammyLawson.png';
import CharlesDaviesFile from '../../../assets/img/coachCharlesDavies.png';

export default {
  title: 'Digital Hybrid/Organisms/Coach Meet The Coaches',
  component: CoachMeetTheCoaches,
} as Meta;

const Template: Story<MeetTheCoachesProps> = ({ ...args }) => <CoachMeetTheCoaches {...args} />;

export const Default = Template.bind({});

Default.args = {
  coaches: [
    {
      name: 'Matt Morgan',
      bio: 'Coach background experience Coach background Coach background experience',
      image: MattMorganFile,
    },
    {
      name: 'Sammy Lawson',
      bio: 'Coach background experience Coach background Coach background experience',
      image: SammyLawsonFile,
    },
    {
      name: 'Charles Davies',
      bio: 'Coach background experience Coach background Coach background experience',
      image: CharlesDaviesFile,
    },
  ],
};
