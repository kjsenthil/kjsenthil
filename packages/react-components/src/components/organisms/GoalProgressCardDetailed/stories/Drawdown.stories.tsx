/* eslint-disable @typescript-eslint/dot-notation */
/* Disabled so that we can use dayjs()['add'] instead of dayjs().add(). This is a work around for
   this bug: https://github.com/storybookjs/storybook/issues/12208 */
import { Meta, Story } from '@storybook/react/types-6-0';
import * as React from 'react';
import dayjs from 'dayjs';
import {
  GoalProgressCardDetailed,
  GoalProgressCardDetailedProps,
  GoalProgressCardStyle,
} from '../GoalProgressCardDetailed';
import { Spacer } from '../../../atoms';

const accounts = ['ISA', 'SIPP'];

export default {
  title: 'Digital Hybrid/Organisms/Goal Progress Card/Monthly or Annual Drawdown',
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
NotThereYet.storyName = 'Not there yet';
NotThereYet.args = {
  name: "Olivia's education",
  iconSrc: 'goals/large/my-childs-education.png',
  lumpSumDate: undefined,
  startDate: dayjs()['add'](1, 'year').toDate(),
  endDate: dayjs()['add'](5, 'year').toDate(),
  ageAtLumpSumDate: undefined,
  ageAtStartDate: 41,
  ageAtEndDate: 45,
  affordableAmount: 180_000,
  targetAmount: 220_000,
  shortfall: -40_000,
  onTrackPercentage: 0.8181818,
  lumpSum: undefined,
  totalAffordableDrawdown: undefined,
  remainingAmount: undefined,
  accounts,
} as GoalProgressCardDetailedProps;

export const Ongoing = Template.bind({});
Ongoing.storyName = 'Ongoing';
Ongoing.args = {
  name: "Olivia's education",
  iconSrc: 'goals/large/my-childs-education.png',
  lumpSumDate: undefined,
  startDate: dayjs().subtract(1, 'year').toDate(),
  endDate: dayjs()['add'](5, 'year').toDate(),
  ageAtLumpSumDate: undefined,
  ageAtStartDate: 41,
  ageAtEndDate: 45,
  affordableAmount: 180_000,
  targetAmount: 220_000,
  shortfall: -40_000,
  onTrackPercentage: 0.8181818,
  lumpSum: undefined,
  totalAffordableDrawdown: undefined,
  remainingAmount: undefined,
  accounts,
} as GoalProgressCardDetailedProps;

export const Finished = Template.bind({});
Finished.storyName = 'Finished';
Finished.args = {
  name: 'My second car',
  iconSrc: 'goals/large/something-else.jpg',
  lumpSumDate: undefined,
  startDate: dayjs().subtract(5, 'year').toDate(),
  endDate: dayjs().subtract(1, 'year').toDate(),
  ageAtLumpSumDate: undefined,
  ageAtStartDate: 41,
  ageAtEndDate: 45,
  affordableAmount: 180_000,
  targetAmount: 220_000,
  shortfall: -40_000,
  onTrackPercentage: 0.8181818,
  lumpSum: undefined,
  totalAffordableDrawdown: undefined,
  remainingAmount: undefined,
  accounts,
} as GoalProgressCardDetailedProps;
