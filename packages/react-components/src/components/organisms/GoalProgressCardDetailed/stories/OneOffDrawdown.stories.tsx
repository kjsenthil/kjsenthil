/* eslint-disable @typescript-eslint/dot-notation */
/* Disabled so that we can use dayjs()['add'] instead of dayjs().add(). This is a work around for
   this bug: https://github.com/storybookjs/storybook/issues/12208 */
import { Meta, Story } from '@storybook/react/types-6-0';
import * as React from 'react';
import dayjs from 'dayjs';
import GoalProgressCardDetailed, {
  GoalProgressCardDetailedProps,
  GoalProgressCardStyle,
} from '../GoalProgressCardDetailed';
import { Spacer } from '../../../atoms';

const accounts = ['ISA'];

export default {
  title: 'Digital Hybrid/Organisms/Goal Progress Card/One-off Drawdown',
  component: GoalProgressCardDetailed,
} as Meta;

const Template: Story<GoalProgressCardDetailedProps> = (args) => (
  <>
    <GoalProgressCardDetailed {...args} />
    <Spacer y={2} />
    <GoalProgressCardDetailed {...args} style={GoalProgressCardStyle.simple} />
  </>
);

export const NotThereYet = Template.bind({});
NotThereYet.storyName = 'Not there yet, shortfall';
NotThereYet.args = {
  name: 'Buying a home',
  iconSrc: 'goals/large/buying-a-home.jpg',
  lumpSumDate: undefined,
  startDate: undefined,
  endDate: dayjs()['add'](1, 'year').toDate(),
  ageAtLumpSumDate: undefined,
  ageAtStartDate: undefined,
  ageAtEndDate: 41,
  affordableAmount: 180_000,
  targetAmount: 220_000,
  shortfall: -40_000,
  onTrackPercentage: 0.8181818,
  lumpSum: undefined,
  totalAffordableDrawdown: undefined,
  remainingAmount: undefined,
  accounts,
} as GoalProgressCardDetailedProps;

export const NotThereYetOnTrack = Template.bind({});
NotThereYetOnTrack.storyName = 'Not there yet, on-track';
NotThereYetOnTrack.args = {
  name: 'Buying a home',
  iconSrc: 'goals/large/buying-a-home.jpg',
  lumpSumDate: undefined,
  startDate: undefined,
  endDate: dayjs()['add'](1, 'year').toDate(),
  ageAtLumpSumDate: undefined,
  ageAtStartDate: undefined,
  ageAtEndDate: 41,
  affordableAmount: 234_000,
  targetAmount: 220_000,
  shortfall: 14_000,
  onTrackPercentage: 1.0,
  lumpSum: undefined,
  totalAffordableDrawdown: undefined,
  remainingAmount: undefined,
  accounts,
} as GoalProgressCardDetailedProps;

export const Finished = Template.bind({});
Finished.storyName = 'Finished';
Finished.args = {
  name: 'Buying a home',
  iconSrc: 'goals/large/buying-a-home.jpg',
  lumpSumDate: undefined,
  startDate: undefined,
  endDate: dayjs().subtract(1, 'year').toDate(),
  ageAtLumpSumDate: undefined,
  ageAtStartDate: undefined,
  ageAtEndDate: 41,
  affordableAmount: 180_000,
  targetAmount: 220_000,
  shortfall: -40_000,
  onTrackPercentage: 0.8181818,
  lumpSum: undefined,
  totalAffordableDrawdown: undefined,
  remainingAmount: undefined,
  accounts,
} as GoalProgressCardDetailedProps;
